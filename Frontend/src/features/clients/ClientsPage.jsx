import React, { useEffect, useState } from "react";
import ClientHeader from "./ClientHeader";
import ClientCard from "./ClientCard";
import AddClientModal from "./AddClientModal";
import Loader from "../../components/common/Loader";

import {
  getClients,
  createClient,
  editClient,
  deleteClient,
} from "./clients.api";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const [editClientData, setEditClientData] = useState(null);

  //  Fetch clients
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

  // ADD CLIENT
  const handleAddClient = async (data) => {
    try {
      const res = await createClient(data);

      // instant UI update
      setClients((prev) => [res.data.client, ...prev]);
    } catch (err) {
      console.log("Create client error:", err);
    }
  };

  //  EDIT CLICK
  const handleEdit = (client) => {
    setEditClientData(client);
    setOpen(true);
  };

  // UPDATE CLIENT
 const handleUpdateClient = async (id, data) => {
  try {
    
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== "" && value !== null
      )
    );

    const res = await editClient(id, cleanedData);

    console.log("UPDATE RESPONSE:", res.data);

    const updated = res.data.updatedClient || res.data.client;

    if (!updated) return;

    //  safe update
    setClients((prev) =>
      prev.map((c) =>
        c._id === id ? updated : c
      )
    );
  } catch (err) {
    console.log(err.response?.data);
  }
};

  //  DELETE CLIENT
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this client?");
    if (!confirmDelete) return;

    try {
      await deleteClient(id);

      setClients((prev) =>
        prev.filter((c) => c._id !== id)
      );

      alert("Client deleted successfully");
    } catch (error) {
      console.log("Delete client error:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <ClientHeader
        count={clients.length}
        onAddClick={() => setOpen(true)}
      />

      {/* Loading */}
      {loading && <Loader />}

      {/* Error */}
      {error && (
        <p className="text-red-400 mt-6">{error}</p>
      )}

      {/* Empty */}
      {!loading && clients.length === 0 && (
        <p className="text-gray-400 mt-6 text-center">
          No clients yet. Add your first client 
        </p>
      )}

      {/* Grid */}
      {!loading && clients.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {clients.map((client) => (
            <ClientCard
              key={client._id}
              {...client}
              onEdit={() => handleEdit(client)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <AddClientModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditClientData(null); //  reset
        }}
        onAddClient={handleAddClient}
        onUpdateClient={handleUpdateClient}
        editClient={editClientData}
      />
    </div>
  );
};

export default ClientsPage;