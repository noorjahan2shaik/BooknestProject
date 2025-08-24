import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [copies, setCopies] = useState(1);
  const [coverUrl, setCoverUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }
      try {
        const res = await axios.get('http://localhost:8080/api/categories/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        alert('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return;
    }

    if (!categoryId) {
      alert('Please select a category');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8080/api/books/add',
        { title, author, copies, coverUrl, categoryId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Book added successfully!');
      setTitle('');
      setAuthor('');
      setCopies(1);
      setCoverUrl('');
      setCategoryId('');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter book title"
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="Enter author's name"
          />
        </div>
        <div>
          <label>Copies:</label>
          <input
            type="number"
            value={copies}
            onChange={(e) => setCopies(Number(e.target.value))}
            min="1"
            required
          />
        </div>
        <div>
          <label>Cover Image URL:</label>
          <input
            type="text"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="Enter image URL or base64"
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: '20px' }}>
          <button type="submit">Add Book</button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
