// src/components/RequestList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending requests from backend
  const fetchRequests = async () => {
    try {
      const res = await axios.get('/api/issues/pending');
      setRequests(res.data);
    } catch (error) {
      alert('Failed to load requests');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Update request status: approve or reject
  const handleAction = async (id, action) => {
    try {
      await axios.put(`/api/issues/update/${id}`, null, {
        params: { status: action },
      });
      alert(`Request ID ${id} has been ${action}`);

      // Remove the updated request from the list
      setRequests(prev => prev.filter(req => req.id !== id));
    } catch (error) {
      alert('Failed to update request status');
      console.error(error);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading requests...</div>;
  }

  if (requests.length === 0) {
    return <div style={{ padding: '20px' }}>No pending requests.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pending Issue Requests</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {requests.map((req) => (
          <li key={req.id} style={{
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '15px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong>Book:</strong> {req.book?.title || 'Unknown'} <br />
              <strong>Requested by User ID:</strong> {req.userId || 'Unknown'}
            </div>
            <div>
              <button
                onClick={() => handleAction(req.id, 'approved')}
                style={{ marginRight: '10px', backgroundColor: 'green', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px' }}
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(req.id, 'rejected')}
                style={{ backgroundColor: 'red', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px' }}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestList;
