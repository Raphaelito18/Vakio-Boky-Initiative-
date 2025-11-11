import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const auth = useAuth();
  const token = auth.user?.token;

  const getAuthHeaders = () => {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  };

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:5000/api/campaigns", {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setCampaigns(data);
      return data;
    } catch (err) {
      const errorMessage =
        err.message || "Erreur lors du chargement des campagnes";
      setError(errorMessage);
      console.error("fetchCampaigns error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (campaignData) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:5000/api/campaigns", {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(campaignData),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      await fetchCampaigns();

      return data;
    } catch (err) {
      const errorMessage =
        err.message || "Erreur lors de la création de la campagne";
      setError(errorMessage);
      console.error("createCampaign error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const makeDonation = async (donationData) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err.message || "Erreur lors du traitement du don";
      setError(errorMessage);
      console.error("makeDonation error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError("");
  const reset = () => {
    setCampaigns([]);
    setDonations([]);
    setError("");
    setLoading(false);
  };

  return {
    campaigns,
    donations,
    loading,
    error,
    fetchCampaigns,
    createCampaign,
    makeDonation,
    clearError,
    reset,
    setCampaigns,
    setDonations,
  };
};
