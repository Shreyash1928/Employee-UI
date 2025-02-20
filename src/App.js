// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';

import AddEmployee from './Components/AddEmployee';
import EmployeeList from './Components/Employeelist';
import HomePage from './Components/Homepage';  
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';  
import ContactUsForm from './Components/Contactus';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar is always visible */}
        <Navbar />
        
        {/* ToastContainer is always visible to show notifications */}
        <ToastContainer />
        
        {/* Main content area which will change based on the route */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/contact-us" element={<ContactUsForm />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </div>
        
        {/* Footer is always at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
