import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiPackage, FiCreditCard } from "react-icons/fi";
import { useMarketplace } from "@/hooks/useMarketplace";
import { useAuth } from "@/hooks/useAuth";
import ProductCard from "@/components/marketplace/ProductCard";
import OrderModal from "@/components/marketplace/OrderModal";
import ConfirmationModal from "@/components/marketplace/ConfirmationModal";
import Button from "@/components/ui/Button";
import { useEmail } from "@/hooks/useEmail";

export default function Marketplace() {
  const { products, orders, loading, error, createOrder, fetchUserOrders } =
    useMarketplace();

  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);

  const { sendOrderConfirmation } = useEmail();

  const handleOrderProduct = (product) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmitOrder = async (orderData) => {
    setOrderLoading(true);

    try {
      console.log("🔄 Création de commande...", orderData);

      const result = await createOrder(orderData);
      console.log("✅ Commande créée:", result);

      const userEmail = user?.email || user?.user?.email;

      if (userEmail) {
        try {
          console.log("📧 Envoi email de confirmation à:", userEmail);

          await sendOrderConfirmation({
            user: {
              first_name:
                user?.first_name || user?.user?.first_name || "Client",
              email: userEmail,
            },
            order: {
              order_number:
                result.id || result.order_number || `CMD-${Date.now()}`,
              created_at: result.created_at || new Date().toISOString(),
            },
            orderItems: [
              {
                product_name: selectedProduct?.name || "Produit",
                quantity: orderData.quantity || 1,
                price: selectedProduct?.price || 0,
              },
            ],
          });

          console.log("✅ Email de confirmation envoyé !");
        } catch (emailError) {
          console.error("⚠️ Email non envoyé:", emailError);
        }
      } else {
        console.warn("⚠️ Aucun email trouvé. User object:", user);
      }
      setLastOrder({
        order: result,
        product: selectedProduct,
      });
      setIsConfirmationModalOpen(true);
      setIsOrderModalOpen(false);

      await fetchUserOrders();
    } catch (error) {
      console.error("❌ Erreur lors de la commande:", error);
      alert(`Erreur: ${error.message}`);
    } finally {
      setOrderLoading(false);
    }
  };
  const handleCloseConfirmation = () => {
    setIsConfirmationModalOpen(false);
    setLastOrder(null);
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-900">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiShoppingCart className="text-4xl text-blue-600" />
            <h1 className="text-4xl font-bold text-blue-900 font-mono">
              Marketplace Vakio Boky
            </h1>
          </div>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Découvrez nos produits exclusifs et soutenez l'initiative Vakio
            Boky. Chaque achat contribue à promouvoir la littérature malgache.
          </p>
        </motion.div>

        {/* Erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center"
          >
            ❌ {error}
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.location.reload()}
              className="ml-4"
            >
              Réessayer
            </Button>
          </motion.div>
        )}

        {/* Produits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-900 font-mono flex items-center gap-2">
              <FiPackage />
              Nos Produits ({products.length})
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <FiPackage className="text-6xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Aucun produit disponible pour le moment
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOrder={handleOrderProduct}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Commandes de l'utilisateur */}
        {user && orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-blue-900 font-mono flex items-center gap-2 mb-6">
              <FiCreditCard />
              Mes Commandes ({orders.length})
            </h2>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          order.image_url || "/images/placeholder-product.jpg"
                        }
                        alt={order.product_name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-blue-900">
                          {order.product_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Quantité: {order.quantity} • Total:{" "}
                          {order.total_amount} €
                        </p>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            order.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status === "confirmed"
                            ? "Confirmée"
                            : "En attente"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal de commande */}
      <OrderModal
        product={selectedProduct}
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        onSubmit={handleSubmitOrder}
        loading={orderLoading}
      />

      {/* Modal de confirmation */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmation}
        order={lastOrder?.order}
        product={lastOrder?.product}
      />
    </div>
  );
}
