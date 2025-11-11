import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getAllProducts,
  createOrder,
  getOrderDetails,
  processPayment,
  getUserOrders,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProductsAdmin,
} from "../controllers/marketplaceController.js";

const router = express.Router();

router.get("/marketplace", getAllProducts);
router.post("/orders", authenticateToken, createOrder);
router.get("/orders/:id", authenticateToken, getOrderDetails);
router.post("/payments", authenticateToken, processPayment);
router.get("/user/orders", authenticateToken, getUserOrders);

router.get("/admin/marketplace", authenticateToken, getAllProductsAdmin);
router.post("/admin/marketplace", authenticateToken, addProduct);
router.put("/admin/marketplace/:id", authenticateToken, updateProduct);
router.delete("/admin/marketplace/:id", authenticateToken, deleteProduct);

export default router;
