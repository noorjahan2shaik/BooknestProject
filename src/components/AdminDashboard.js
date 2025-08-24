// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Add this line

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get("http://localhost:8080/api/categories/all", { headers });
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          alert("Session expired or unauthorized. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchCategories();
  }, [token, navigate]);

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      if (!token) {
        alert("You must be logged in to delete a category.");
        navigate("/login");
        return;
      }

      await axios.delete(`http://localhost:8080/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Category deleted successfully!");

      const res = await axios.get("http://localhost:8080/api/categories/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (error) {
      console.error("Error deleting category:", error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert("Unauthorized. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Failed to delete category. Please try again.");
      }
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/admin/category/${encodeURIComponent(category.name)}`);
  };

  return (
    <div className="admin-container">
      <div className="admin-controls">
        <button onClick={() => navigate("/admin/add-category")}>Add Category</button>
        <button onClick={() => navigate("/admin/add-book")}>Add Book</button>
        <button onClick={() => navigate("/admin/requests/pending")}>Pending Requests</button>
        <button onClick={() => navigate("/admin/requests/approved")}>Approved Requests</button>
        <button onClick={() => navigate("/admin/requests/rejected")}>Rejected Requests</button>
        <button onClick={() => navigate("/userdetails")}>user details</button>
      </div>

      <h3>Existing Categories:</h3>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => handleCategoryClick(cat)}
            >
              <h4>{cat.name}</h4>
              <p>Click to view books</p>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCategory(cat.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => navigate("/login")}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          background: "#333",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back
      </button>
    </div>
  );
};

export default AdminDashboard;
