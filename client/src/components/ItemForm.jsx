import React from "react";
import "./ItemStyles.css";

function ItemForm({ formData, onFormChange, onSubmit, editingId, onCancel }) {
  return (
    <div className="card">
      <h3 className="card-title">
        {editingId ? "Update Item" : "Add New Item"}
      </h3>

      {editingId && (
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel Edit
        </button>
      )}

      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="input"
            placeholder="Title"
            value={formData.title}
            onChange={onFormChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="input"
            placeholder="Description"
            value={formData.description}
            onChange={onFormChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {editingId ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
