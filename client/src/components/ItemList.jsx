import React from "react";
import "./ItemStyles.css";

function ItemList({ items, onEdit, onDelete }) {
  return (
    <div className="card">
      <h2 className="card-title">Your Items</h2>

      {items.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <div className="list">
          {items.map((item) => (
            <div key={item._id} className="list-item">
              <div className="list-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

              <div className="list-actions">
                <button
                  className="btn btn-small btn-primary"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-small btn-danger"
                  onClick={() => onDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList;
