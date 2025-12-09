import React, { useEffect, useState } from "react";
import { me } from "../api/auth";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItem,
  updateItem,
} from "../api/items";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await me();
        setUser(userRes.data);
        const itemRes = await getAllItems();
        setItems(itemRes.data);
      } catch (err) {
        console.error("Error loading data", err);
      }
    };
    fetchData();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return alert("Title is required");
    try {
      if (editingId) {
        const response = await updateItem(editingId, formData);
        setItems(
          items.map((item) => (item._id === editingId ? response.data : item))
        );
        setEditingId(null);
      } else {
        console.log("creating");
        const response = await createItem(formData);
        setItems([...items, response.data]);
      }
      setFormData({ title: "", description: "" });
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({ title: item.title, description: item.description });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", description: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await deleteItem(id);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>Welcome,{user.name}</p> : <p>Loading...</p>}
      <button onClick={handleLogout}>Logout</button>

      <h2>Manage Items</h2>

      <ItemForm
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
        editingId={editingId}
        onCancel={handleCancel}
      />
      <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;
