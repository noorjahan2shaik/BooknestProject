import React, { useEffect, useState } from "react";
import axios from "axios";

const RejectedBooks = () => {
  const [books, setBooks] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/books/requests/user/${userId}/rejected`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching rejected books:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>❌ Rejected Books</h2>
      {books.length === 0 ? (
        <p>No rejected books found.</p>
      ) : (
        books.map((book, index) => (
          <div key={index} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}>
            <p>📖 <strong>Book:</strong> {book.title}</p>
            <p>✍️ <strong>Author:</strong> {book.author}</p>
            <p>🏷️ <strong>Category:</strong> {book.category}</p>
            <p>🗓️ <strong>Requested Date:</strong> {book.requestedDate}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RejectedBooks;
