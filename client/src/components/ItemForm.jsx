import React from "react";

function ItemForm({ formData, onFormChange, onSubmit, editingId, onCancel }) {
  return (
    <div>
      <h3>{editingId ? "Update Item" : "Add New Item"}</h3>

      {editingId && <button onClick={onCancel}>Cancel Edit</button>}

      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={onFormChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={onFormChange}
          />
        </div>

        <button type="submit">{editingId ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default ItemForm;
