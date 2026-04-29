import React, { useEffect, useState } from "react";
import ClientHeader from "./ClientHeader";
import ClientCard from "./ClientCard";
import { getClients, createClient } from "./clients.api";
import Loader from "../../components/common/Loader";
import AddClientModal from "./AddClientModal";
import { editClient , deleteClient } from "./clients.api";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [open, setOpen] = useState(false);

  const handleEdit = ()=>{
     
  }
  const handleDelete = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this client?");
  if (!confirmDelete) return;

  try {
    await deleteClient(id);
    setClients((prev) => prev.filter((c) => c._id !== id));

    alert("Client deleted successfully");
  } catch (error) {
    console.log("delete client error", error);
  }
};

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

 
  const handleAddClient = async (data) => {
    try {
      const res = await createClient(data);

   
      setClients((prev) => [res.data.client, ...prev]);
    } catch (err) {
      console.log("Create client error:", err);
    }
  };

  return (
    <div>
     
      <ClientHeader count={clients.length} onAddClick={() => setOpen(true)} />

      {loading && <Loader />}

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
            <ClientCard key={client._id} {...client}   onEdit={handleEdit}
  onDelete={handleDelete} />
          ))}
        </div>
      )}

      <AddClientModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onAddClient={handleAddClient}
      />
    </div>
  );
};

export default ClientsPage;