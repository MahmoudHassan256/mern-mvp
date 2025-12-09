import React, { useEffect, useState } from "react";
import { me } from "../api/auth";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";
import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
} from "../api/items";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await me();
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await getAllItems();
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };

    fetchUser();
    fetchItems();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingId) {
      const res = await updateItem(editingId, formData);

      setItems(
        items.map((item) =>
          item._id === editingId ? res.data : item
        )
      );

      setEditingId(null);
    } else {
      const res = await createItem(formData);
      setItems([...items, res.data]);
    }

    setFormData({ title: "", description: "" });
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
    if (confirm("Delete this item?")) {
      await deleteItem(id);
      setItems(items.filter((item) => item._id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">

      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="user-info">
          {user ? <span>Hello, {user.name}</span> : <span>Loading...</span>}
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="dashboard-section">
          <ItemForm
            formData={formData}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
            editingId={editingId}
            onCancel={handleCancel}
          />
        </section>

        <section className="dashboard-section">
          <ItemList
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>
      
    </div>
  );
}

export default Dashboard;
