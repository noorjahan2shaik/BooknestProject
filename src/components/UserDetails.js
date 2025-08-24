import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Assuming you pass userId as a URL param (e.g., /userdetails/:userId)
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`http://localhost:8080/api/users/${userId}/details`, { headers });
        setUserDetails(res.data);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchUserDetails();
  }, [token, navigate, userId]);

  if (!userDetails) return <p>Loading user details...</p>;

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>User ID:</strong> {userDetails.userId}</p>
      <p><strong>User Name:</strong> {userDetails.userName}</p>

      <h3>Requested Books:</h3>
      {userDetails.requestedBooks.length === 0 ? (
        <p>No requested books.</p>
      ) : (
        <ul>
          {userDetails.requestedBooks.map((book) => (
            <li key={book.id}>{book.title} (ID: {book.id})</li>
          ))}
        </ul>
      )}

      <h3>Accepted Book IDs:</h3>
      {userDetails.acceptedBookIds.length === 0 ? (
        <p>No accepted books.</p>
      ) : (
        <ul>
          {userDetails.acceptedBookIds.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDetails;
