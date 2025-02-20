import React, { useState } from "react";
import axios from "axios";
import "../Css/Contactus.css";
import { toast } from "react-toastify"; // Importing Toastify
import "react-toastify/dist/ReactToastify.css"; // Importing Toastify CSS

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });

  const [status, setStatus] = useState("");

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      // Send POST request to the backend API with the updated endpoint
      const response = await axios.post(
        "https://localhost:7187/api/email",
        formData
      );

      // Handle successful response
      if (response.data.success) {
        toast.success("Message sent successfully. We will get back to you!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Clear the form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          query: "",
        });

        // Reset status after form submission
        setStatus("");
      } else {
        toast.error("Some error occurred. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Reset status after error
        setStatus("");
      }
    } catch (error) {
      toast.error("Error sending message. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset status after error
      setStatus("");
    }
  };

  return (
    <div className="contact-us-form">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="query">Query:</label>
          <textarea
            id="query"
            name="query"
            value={formData.query}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
};

export default ContactUsForm;
