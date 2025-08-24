import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", author: "", copies: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setBook(res.data))
    .catch((err) => console.error("Error fetching book:", err));
  }, [id, token]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/api/books/${id}`, book, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      alert("Book updated successfully!");
      navigate(-1); // or navigate("/admin/dashboard")
    })
    .catch((err) => {
      console.error("Error updating book:", err);
      alert("Failed to update book.");
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Book</h2>
      <label>Title:</label>
      <input name="title" value={book.title} onChange={handleChange} /><br /><br />
      <label>Author:</label>
      <input name="author" value={book.author} onChange={handleChange} /><br /><br />
      <label>Copies:</label>
      <input name="copies" value={book.copies} onChange={handleChange} /><br /><br />
      <button onClick={handleUpdate}>Update Book</button>
    </div>
  );
};

export default EditBook;
