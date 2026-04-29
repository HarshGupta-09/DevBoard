import React, { useEffect, useState } from "react";
import ClientHeader from "./ClientHeader";
import ClientCard from "./ClientCard";
import { getClients } from "./clients.api";
import Loader from "../../components/common/Loader"

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getClients();
        setClients(res.data.clients || []);
      } catch (err) {
        setError("Failed to load clients");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ClientHeader count={clients.length} />

      {loading && (
        <Loader/>
      )}

      {error && (
        <p className="text-red-400 mt-6">{error}</p>
      )}

      {!loading && clients.length === 0 && (
        <p className="text-gray-400 mt-6 text-center">
          No clients yet. Add your first client 🚀
        </p>
      )}

      {!loading && clients.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {clients.map((client) => (
            <ClientCard key={client._id} {...client} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientsPage;