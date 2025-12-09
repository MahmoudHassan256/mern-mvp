import React from "react";

function ItemList({ items, onEdit, onDelete }) {
  return (
    <div>
      <h2>Your items</h2>

      {items.length === 0 ? (
        <p>No items yet. Create your first item above!</p>
      ) : (
        items.map((item) => (
          <div key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div>
              <button onClick={() => onEdit(item)}>Edit</button>
              <button onClick={() => onDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ItemList;
