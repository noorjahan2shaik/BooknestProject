import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PendingRequests = () => {

  const [pendingRequests, setPendingRequests] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
  const fetchRequests = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get("http://localhost:8080/api/books/requests/pending", { headers });
      setPendingRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch pending requests:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  fetchRequests();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [token, navigate]);

  const handleAccept = async (requestId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/books/requests/${requestId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Request accepted!");
      setPendingRequests(pendingRequests.filter((req) => req.id !== requestId));
    } catch (err) {
      console.error("Error accepting request:", err);
      alert("Failed to accept the request.");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/books/requests/${requestId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Request rejected!");
      setPendingRequests(pendingRequests.filter((req) => req.id !== requestId));
    } catch (err) {
      console.error("Error rejecting request:", err);
      alert("Failed to reject the request.");
    }
  };

  return (
    <div className="pending-requests-container">
      <h2>Pending Book Requests</h2>
      {pendingRequests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Category</th>
              <th>Requested Date</th>
              <th>User ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody> 
            {pendingRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.title}</td>
                <td>{request.category}</td>
                <td>{request.requestedDate || "N/A"}</td>
                <td>{request.userId || "N/A"}</td>
                <td>
                  <button onClick={() => handleAccept(request.id)}>Accept</button>
                  <button onClick={() => handleReject(request.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingRequests;
