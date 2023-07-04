import { useState } from "react";
import "./style.css";
import axios from "axios";
import { BASE_URL } from "../../config";
import { Link } from "react-router-dom";
import Rightbar from "../../components/Rightbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/signup`, formData);
      console.log(response.data); // Process the response data as needed
      const result = response.data;

      // Reset the form fields
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      });

      if (result.status === 200) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (e) {
      toast.error("Something went wrong!");
      console.error("Err part::", e);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="signup-form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-head">
            <div>Signup</div>
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <p className="login-text">
            Already have account?
            <span>
              <Link to="/"> Login</Link>
            </span>
          </p>
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
      </div>

      <ToastContainer />
      <Rightbar />
    </div>
  );
};

export default SignupForm;
