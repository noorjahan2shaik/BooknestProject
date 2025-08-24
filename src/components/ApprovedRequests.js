import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AcceptedRequests = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get("http://localhost:8080/api/books/requests/accepted", { headers });
        setAcceptedRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch approved requests:", err);
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

  return (
    <div className="accepted-requests-container">
      <h2>Approved Book Requests</h2>
      {acceptedRequests.length === 0 ? (
        <p>No approved requests.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Category</th>
              <th>Requested Date</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {acceptedRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.title}</td>
                <td>{request.category}</td>
                <td>{request.requestedDate || "N/A"}</td>
                <td>{request.userId || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AcceptedRequests;
