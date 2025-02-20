import React from 'react';
import '../Css/Homepage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Employee Management System</h1>
      <p>Manage your employees easily and efficiently. Navigate through the system to add new employees, view existing employees, or get in touch with us.</p>

      {/* Key Features Section */}
      <div className="key-features">
        <h2>Key Features:</h2>
        <ul>
          <li>Manage employee details like name, position, and salary</li>
          <li>View and edit employee information</li>
          <li>Delete inactive employees</li>
          <li>Get in touch through the Contact Us form</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
