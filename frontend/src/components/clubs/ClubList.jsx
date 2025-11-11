import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import Button from "@/components/ui/Button";

export default function ClubList() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    fetch("http://localhost:5000/api/clubs", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setClubs(data.clubs);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p className="text-center mt-8">Chargement...</p>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Clubs</h2>
        <Button onClick={() => navigate("/clubs/create")}>Créer un club</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clubs.map(club => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-2xl shadow-md cursor-pointer"
            onClick={() => navigate(`/clubs/${club.id}`)}
          >
            <img src={club.image_url || "/placeholder.jpg"} alt={club.nom} className="h-40 w-full object-cover rounded-lg mb-2"/>
            <h3 className="text-lg font-bold text-blue-900">{club.nom}</h3>
            <p className="text-gray-600 text-sm">{club.ville}, {club.pays}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
