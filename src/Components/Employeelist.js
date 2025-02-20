import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/EmployeeList.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedEmployee, setExpandedEmployee] = useState(null);

  // For Edit Form
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set how many items you want per page

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://localhost:7187/api/Employee');
      setEmployees(response.data);
    } catch (err) {
      setError('Error fetching employees. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDetails = (employee) => {
    if (expandedEmployee && expandedEmployee.id === employee.id) {
      setExpandedEmployee(null);
      setEditingEmployee(null); // Reset edit state when closing details
    } else {
      setExpandedEmployee(employee);
    }
  };

  const handleDelete = async (employeeId) => {
    // Ask for confirmation before proceeding with the delete action
    const isConfirmed = window.confirm('Are you sure you want to delete this employee?');
    
    if (isConfirmed) {
      try {
        // Send delete request to the API
        await axios.delete(`https://localhost:7187/api/Employee/${employeeId}`);
        
        // Remove the deleted employee from the state
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== employeeId)
        );
        
        // Show a success toast notification
        toast.info('Employee Deleted Successfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (err) {
        // Show an error message if the delete operation fails
        alert('Error deleting employee. Please try again.');
      }
    } else {
      // If the user cancels, you can add any additional logic here
      console.log('Delete action canceled.');
    }
  };
  

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`https://localhost:7187/api/Employee/${editingEmployee.id}`, editingEmployee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === editingEmployee.id ? response.data : employee
        )
      );
      setEditingEmployee(null); // Close the edit form
      toast.success('Employee updated successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error('Error updating employee. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Get current employees for the current page
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error} <button onClick={fetchEmployees} className="retry-button">Retry</button></div>;

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <React.Fragment key={employee.id}>
              <tr>
                <td>{employee.firstName} {employee.lastName}</td>
                <td>{employee.position}</td>
                <td>${employee.salary}</td>
                <td>
                  <button onClick={() => handleToggleDetails(employee)} className="view-button">
                    {expandedEmployee && expandedEmployee.id === employee.id ? 'Hide Details' : 'View Details'}
                  </button>
                  <button onClick={() => handleDelete(employee.id)} className="delete-button">
                    Delete Employee
                  </button>
                  {expandedEmployee && expandedEmployee.id === employee.id && (
                    <button onClick={() => handleEdit(employee)} className="edit-button">
                      Edit
                    </button>
                  )}
                </td>
              </tr>
              {expandedEmployee && expandedEmployee.id === employee.id && !editingEmployee && (
                <tr className="employee-details-row">
                  <td colSpan="4">
                    <div className="employee-details">
                      <p><strong>First Name:</strong> {employee.firstName}</p>
                      <p><strong>Last Name:</strong> {employee.lastName}</p>
                      <p><strong>Position:</strong> {employee.position}</p>
                      <p><strong>Salary:</strong> ${employee.salary}</p>
                      <p><strong>Department:</strong> {employee.department}</p>
                      <p><strong>Date of Joining:</strong> {employee.dateOfJoining}</p>
                      <p><strong>Status:</strong> {employee.isActive ? "Active" : "Inactive"}</p>
                    </div>
                  </td>
                </tr>
              )}
              {editingEmployee && editingEmployee.id === employee.id && (
                <tr className="employee-details-row">
                  <td colSpan="4">
                    <div className="employee-details">
                      <form onSubmit={handleUpdate}>
                        <label>
                          First Name:
                          <input
                            type="text"
                            value={editingEmployee.firstName}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, firstName: e.target.value })}
                            required
                          />
                        </label>
                        <label>
                          Last Name:
                          <input
                            type="text"
                            value={editingEmployee.lastName}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, lastName: e.target.value })}
                            required
                          />
                        </label>
                        <label>
                          Position:
                          <input
                            type="text"
                            value={editingEmployee.position}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
                            required
                          />
                        </label>
                        <label>
                          Salary:
                          <input
                            type="number"
                            value={editingEmployee.salary}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, salary: e.target.value })}
                            required
                          />
                        </label>
                        <label>
                          Department:
                          <input
                            type="text"
                            value={editingEmployee.department}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })}
                            required
                          />
                        </label>
                        <label>
                          Date of Joining:
                          <input
                            type="date"
                            value={editingEmployee.dateOfJoining}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, dateOfJoining: e.target.value })}
                            required
                          />
                        </label>
                        <label>
                          Status:
                          <select
                            value={editingEmployee.isActive ? 'Active' : 'Inactive'}
                            onChange={(e) => setEditingEmployee({ ...editingEmployee, isActive: e.target.value === 'Active' })}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </label>
                        <button type="submit" className="update-button">Update Employee</button>
                        <button type="button" onClick={() => setEditingEmployee(null)} className="cancel-button">Cancel</button>
                      </form>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
