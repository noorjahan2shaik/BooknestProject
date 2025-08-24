// src/components/AddCategory.js
import React, { useState } from 'react';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert('Category name cannot be empty');
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch('http://localhost:8080/api/categories/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: categoryName })
      });

      if (response.ok) {
        alert(`Category "${categoryName}" added successfully!`);
        setCategoryName('');
      } else if (response.status === 409) {  // 409 Conflict = Duplicate
        alert(`Category "${categoryName}" already exists!`);
      } else {
        alert('Failed to add category');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding category');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
