import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiPackage, FiMapPin } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function OrderModal({
  product,
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}) {
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");

  if (!isOpen || !product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (quantity < 1 || quantity > product.stock_quantity) {
      alert("❌ Quantité invalide");
      return;
    }

    if (!shippingAddress.trim()) {
      alert("❌ Veuillez saisir une adresse de livraison");
      return;
    }

    onSubmit({
      product_id: product.id,
      quantity,
      shipping_address: shippingAddress,
    });
  };

  const totalAmount = (product.price * quantity).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <FiPackage />
            Passer commande
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Produit */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <FiPackage className="text-2xl text-blue-400" />
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-1">
                {product.name}
              </h3>
              <p className="text-2xl font-bold text-green-600 mb-2">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(product.price)}
              </p>
              <p className="text-sm text-gray-600">
                Stock:{" "}
                <span className="font-semibold">{product.stock_quantity}</span>{" "}
                unités
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Quantité */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantité
            </label>
            <Input
              type="number"
              min="1"
              max={product.stock_quantity}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              required
            />
          </div>

          {/* Adresse de livraison */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FiMapPin />
              Adresse de livraison
            </label>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Saisissez votre adresse complète de livraison..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              required
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sous-total:</span>
              <span>{(product.price * quantity).toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Livraison:</span>
              <span className="text-green-600">Gratuite</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
              <span>Total:</span>
              <span className="text-lg text-green-600">{totalAmount} €</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={loading}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || product.stock_quantity === 0}
              className="flex-1"
            >
              {loading ? "Traitement..." : "Confirmer la commande"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
