import pool from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM marketplace 
       WHERE status = 'active' 
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      products: result.rows,
    });
  } catch (error) {
    console.error("❌ Erreur récupération produits:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

export const createOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { product_id, quantity, shipping_address } = req.body;
    const userId = req.user.id;

    const productCheck = await client.query(
      `SELECT * FROM marketplace 
       WHERE id = $1 AND status = 'active'`,
      [product_id]
    );

    if (productCheck.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({
        success: false,
        error: "Produit non trouvé",
      });
    }

    const product = productCheck.rows[0];

    if (product.stock_quantity < quantity) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        success: false,
        error: "Stock insuffisant",
      });
    }

    const total_amount = product.price * quantity;

    const orderResult = await client.query(
      `INSERT INTO orders (user_id, product_id, quantity, total_amount, status, shipping_address) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [userId, product_id, quantity, total_amount, "pending", shipping_address]
    );

    await client.query(
      `UPDATE marketplace 
       SET stock_quantity = stock_quantity - $1 
       WHERE id = $2`,
      [quantity, product_id]
    );

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Commande créée avec succès",
      order: orderResult.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Erreur création commande:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  } finally {
    client.release();
  }
};

export const getOrderDetails = async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT o.*, p.name as product_name, p.price, p.image_url
       FROM orders o
       JOIN marketplace p ON o.product_id = p.id
       WHERE o.id = $1 AND o.user_id = $2`,
      [orderId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Commande non trouvé",
      });
    }

    res.json({
      success: true,
      order: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Erreur récupération commande:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

export const processPayment = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { order_id, payment_method, payment_details } = req.body;
    const userId = req.user.id;

    const orderCheck = await client.query(
      `SELECT o.* FROM orders o
       WHERE o.id = $1 AND o.user_id = $2`,
      [order_id, userId]
    );

    if (orderCheck.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({
        success: false,
        error: "Commande non trouvée",
      });
    }

    const order = orderCheck.rows[0];

    const paymentResult = await client.query(
      `INSERT INTO payments (order_id, amount, payment_method, status, payment_details) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [
        order_id,
        order.total_amount,
        payment_method,
        "completed",
        payment_details,
      ]
    );

    await client.query(
      `UPDATE orders 
       SET status = $1, payment_status = $2, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $3`,
      ["confirmed", "paid", order_id]
    );

    await client.query("COMMIT");

    res.json({
      success: true,
      message: "Paiement traité avec succès",
      payment: paymentResult.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Erreur traitement paiement:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  } finally {
    client.release();
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT o.*, p.name as product_name, p.image_url
       FROM orders o
       JOIN marketplace p ON o.product_id = p.id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [userId]
    );

    res.json({
      success: true,
      orders: result.rows,
    });
  } catch (error) {
    console.error("❌ Erreur récupération commandes:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock_quantity, category, image_url } =
      req.body;
    const userId = req.user.id;

    // Vérifier que l'utilisateur est admin
    const userCheck = await pool.query(
      "SELECT role FROM utilisateur WHERE id = $1",
      [userId]
    );

    if (userCheck.rows[0].role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Accès réservé aux administrateurs",
      });
    }

    const result = await pool.query(
      `INSERT INTO marketplace (name, description, price, stock_quantity, category, image_url) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [name, description, price, stock_quantity, category, image_url]
    );

    res.status(201).json({
      success: true,
      message: "Produit ajouté avec succès",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Erreur ajout produit:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      name,
      description,
      price,
      stock_quantity,
      category,
      image_url,
      status,
    } = req.body;
    const userId = req.user.id;

    const userCheck = await pool.query(
      "SELECT role FROM utilisateur WHERE id = $1",
      [userId]
    );

    if (userCheck.rows[0].role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Accès réservé aux administrateurs",
      });
    }

    const result = await pool.query(
      `UPDATE marketplace 
       SET name = $1, description = $2, price = $3, stock_quantity = $4, 
           category = $5, image_url = $6, status = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 
       RETURNING *`,
      [
        name,
        description,
        price,
        stock_quantity,
        category,
        image_url,
        status,
        productId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Produit non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Produit modifié avec succès",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Erreur modification produit:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    const userCheck = await pool.query(
      "SELECT role FROM utilisateur WHERE id = $1",
      [userId]
    );

    if (userCheck.rows[0].role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Accès réservé aux administrateurs",
      });
    }

    const ordersCheck = await pool.query(
      "SELECT COUNT(*) FROM orders WHERE product_id = $1",
      [productId]
    );

    if (parseInt(ordersCheck.rows[0].count) > 0) {
      return res.status(400).json({
        success: false,
        error:
          "Impossible de supprimer un produit avec des commandes associées",
      });
    }

    const result = await pool.query(
      "DELETE FROM marketplace WHERE id = $1 RETURNING *",
      [productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Produit non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Produit supprimé avec succès",
    });
  } catch (error) {
    console.error("❌ Erreur suppression produit:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

export const getAllProductsAdmin = async (req, res) => {
  try {
    const userId = req.user.id;

    const userCheck = await pool.query(
      "SELECT role FROM utilisateur WHERE id = $1",
      [userId]
    );

    if (userCheck.rows[0].role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Accès réservé aux administrateurs",
      });
    }

    const result = await pool.query(
      `SELECT * FROM marketplace 
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      products: result.rows,
    });
  } catch (error) {
    console.error("❌ Erreur récupération produits admin:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};
