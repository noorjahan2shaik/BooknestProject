// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CategoryBooks from "./pages/CategoryBooks";
import AdminDashboard from './components/AdminDashboard';
import AddCategory from './components/AddCategory';
import AddBook from './components/AddBook';
import RequestList from './components/RequestList';
import StudentDashboard from './components/StudentDashboard';
import AcceptedBooks from './pages/AcceptedBooks';
import RejectedBooks from './pages/RejectedBooks';
import RequestedBooks from './pages/RequestedBooks';
import PendingRequests from './components/PendingRequests';
import ApprovedRequests from './components/ApprovedRequests'; // if you have one
import RejectedRequests from './components/RejectedRequests'; 
import EditBook from './components/EditBook';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard/>} />
        <Route path="/admin/add-category" element={<AddCategory />} />
        <Route path="/admin/add-book" element={<AddBook />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/admin/requests" element={<RequestList />} />
        <Route path="/admin/category/:categoryName" element={<CategoryBooks />} />
        <Route path="/student/requested" element={<RequestedBooks />} />
        <Route path="/student/accepted" element={<AcceptedBooks />} />
        <Route path="/student/rejected" element={<RejectedBooks />} />
        <Route path="/admin/requests/pending" element={<PendingRequests />} />
        <Route path="/admin/requests/approved" element={<ApprovedRequests />} />
        <Route path="/admin/requests/rejected" element={<RejectedRequests />} />    
        <Route path="/admin/books/edit/:id" element={<EditBook />} />

      </Routes>
    </Router>
  );
};

export default App;

