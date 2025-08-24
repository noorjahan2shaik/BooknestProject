import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryBooks = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(
          `http://localhost:8080/api/books/category/${categoryName}`,
          { headers }
        );
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          alert("Unauthorized. Please login again.");
          navigate("/login");
        }
      }
    };

    fetchBooks();
  }, [categoryName, token, navigate]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this book?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete the book.");
    }
  };

  const handleEdit = (id) => {
    // Navigate to your edit book page, pass book id as param
    navigate(`/admin/books/edit/${id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Books in "{categoryName}"</h2>
      {books.length === 0 ? (
        <p>No books found in this category.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "2px solid #ccc", textAlign: "left", padding: "8px" }}>Book Name</th>
              <th style={{ borderBottom: "2px solid #ccc", textAlign: "left", padding: "8px" }}>Author</th>
              <th style={{ borderBottom: "2px solid #ccc", textAlign: "left", padding: "8px" }}>Count</th>
              <th style={{ borderBottom: "2px solid #ccc", textAlign: "left", padding: "8px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>{book.title}</td>
                <td style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>{book.author}</td>
                <td style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>{book.count || 0}</td>
                <td style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                  <button
                    onClick={() => handleEdit(book.id)}
                    style={{
                      background: "#007bff",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "4px",
                      marginRight: "8px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        onClick={() => navigate("/admin/dashboard")}
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
        Back to Dashboard
      </button>
    </div>
  );
};

export default CategoryBooks;
