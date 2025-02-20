import React, { useState } from "react";
import axios from "axios";
import "../Css/AddEmployee.css"; // Your styles
import { toast } from "react-toastify"; // Importing Toastify
import "react-toastify/dist/ReactToastify.css"; // Importing Toastify CSS

const AddEmployee = ({ addEmployee }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("Software");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [isActive, setIsActive] = useState(true);

  const departments = [
    "Software",
    "IT",
    "HR",
    "Technical",
    "Audit",
    "Data Entry",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
      firstName,
      lastName,
      position,
      salary: parseFloat(salary),
      department,
      dateOfJoining,
      isActive,
    };

    try {
      // Make the API request
      const response = await axios.post(
        "https://localhost:7187/api/Employee",
        newEmployee
      );

      // Check if the response is successful (status 200 or 201)
      if (response.status === 200 || response.status === 201) {
        console.log("Employee added:", response.data);

        //addEmployee(response.data);

        // Toastify success message
        toast.success("Employee Added Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Pass the new employee data to the parent to update the list
        addEmployee(response.data);

        // Reset the form after successful submission
        setFirstName("");
        setLastName("");
        setPosition("");
        setSalary("");
        setDepartment("Software");
        setDateOfJoining("");
        setIsActive(true);
      } else {
        // If the response is not 200 or 201, show an error toast
        toast.error("Unexpected response from server. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
        console.error("Error adding employee:", error);

        // Toastify error message in case of any error
        // toast.error("Error adding employee. Please try again.", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      
      }
  };

  return (
    <center>
      <div className="form-container">
        <h1>Add New Employee</h1>
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-grid">
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Position:</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Salary:</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Department:</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Date of Joining:</label>
              <input
                type="date"
                value={dateOfJoining}
                onChange={(e) => setDateOfJoining(e.target.value)}
                required
              />
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                Is Active
              </label>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Add Employee
          </button>
        </form>
      </div>
    </center>
  );
};

export default AddEmployee;
