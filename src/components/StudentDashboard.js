// src/components/StudentDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  //const userName = localStorage.getItem("name");
  //const userEmail = localStorage.getItem("email");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/categories/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchBooks = async () => {
    try {
      let url = "http://localhost:8080/api/books/all";
      if (selectedCategory) {
        url = `http://localhost:8080/api/books/category/${encodeURIComponent(selectedCategory)}`;
      }
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

const handleRequest = async (book) => {
  if (!userId) {
    alert("User not logged in!");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/api/books/requests",
      {
        userId: userId,
        bookId: book.id,
        bookName: book.title,
        category: selectedCategory || "Unknown",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Show backend message here instead of fixed alert
    alert(response.data); // This will show your backend message (e.g. success or already requested)
  } catch (error) {
    console.error("Error requesting book: ", error);

    // If backend sends a message in error response
    if (error.response && error.response.data) {
      alert(error.response.data);
    } else {
      alert("Failed to request book.");
    }
  }
};




  const filteredBooks = books.filter((book) =>
    (book.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
  {/* Sidebar */}
  <div className="sidebar">
    <h3>Categories</h3>
    {categories.map((cat) => (
      <div
        key={cat.id}
        className={`category-item ${
          selectedCategory === cat.name ? "selected" : ""
        }`}
        onClick={() => setSelectedCategory(cat.name)}
      >
        {cat.name}
      </div>
    ))}
  </div>

  {/* Main Content */}
  <div className="main-content">
    <div className="profile-container">
      <button onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
        Profile ▾
      </button>
      {showProfileDropdown && (
        <div className="profile-dropdown">
          <div
            className="dropdown-item"
            onClick={() => {
              navigate("/student/requested");
              setShowProfileDropdown(false);
            }}
          >
            Requested Books
          </div>
          <div
            className="dropdown-item"
            onClick={() => {
              navigate("/student/accepted");
              setShowProfileDropdown(false);
            }}
          >
            Accepted Books
          </div>
          <div
            className="dropdown-item"
            onClick={() => {
              navigate("/student/rejected");
              setShowProfileDropdown(false);
            }}
          >
            Rejected Books
          </div>
          <div
            className="dropdown-item"
            onClick={() => {
              localStorage.clear();
              navigate("/");
              setShowProfileDropdown(false);
            }}
          >
            Logout
          </div>
        </div>
      )}
    </div>

    <input
      type="text"
      placeholder="Search book..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-bar"
    />

    <div className="book-grid">
      {filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        filteredBooks.map((book) => (
          <div key={book.id} className="book-card">
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            <button onClick={() => handleRequest(book)}>Request</button>
          </div>
        ))
      )}
    </div>
  </div>
</div>

  );
};

// Dropdown item style
const dropdownItemStyle = {
  padding: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
  backgroundColor: "#fff",
  transition: "background-color 0.2s",
};

export default StudentDashboard;
