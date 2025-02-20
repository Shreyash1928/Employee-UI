import React from 'react';
import '../Css/Navbar.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom to create navigation links

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link> {/* Link to Home Page */}
        </li>
        <li>
          <Link to="/add-employee">Add Employee</Link> {/* Link to Add Employee page */}
        </li>
        <li>
          <Link to="/employee-list">Employee List</Link> {/* Link to Employee List page */}
        </li>
        <li>
          <Link to="/contact-us">Contact Us</Link> {/* Link to Contact Us page */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
