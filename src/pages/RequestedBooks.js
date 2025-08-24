// src/components/RequestedBooks.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestedBooks = () => {
  const [requestedBooks, setRequestedBooks] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequestedBooks = async () => {
  const token = localStorage.getItem("token"); // assuming you saved it after login
  try {
    const response = await axios.get(`http://localhost:8080/api/books/requests/user/${userId}/pending`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setRequestedBooks(response.data);
  } catch (error) {
    console.error("Error fetching requested books: ", error);
  }
};
    fetchRequestedBooks();
  }, [userId, token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📚 Your Requested Books</h2>
      {requestedBooks.length === 0 ? (
        <p className="text-gray-600">You haven't requested any books yet.</p>
      ) : (
        <div className="space-y-4">
  <div>
    <h2>Your Requested Books</h2>
    {requestedBooks.map((book, index) => (
  <div key={index} className="book-card">
    <p>📖 <strong>Book:</strong> {book.title}</p>
    <p>✍️ <strong>Author:</strong> {book.author}</p>
    <p>🏷️ <strong>Category:</strong> {book.category}</p>
    <p>🗓️ <strong>Requested Date:</strong> {book.requestedDate}</p>
  </div>
))}

  </div>
);



        </div>
      )}
    </div>
  );
};

export default RequestedBooks;
