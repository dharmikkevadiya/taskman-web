import { useState } from "react";
import "./style.css";
import axios from "axios";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import Rightbar from "../../components/Rightbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: username,
        password,
      });
      const result = response.data;

      if (result.status === 200) {
        localStorage.setItem("token", result?.data?.token);
        localStorage.setItem("user", JSON.stringify(result.data));

        navigate("/users");
      } else {
        toast.error(result.message);
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again!");
      console.error("Err part::", e);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-head">Login</h2>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="forgot_password_text">
            <a href="/">Forgot password?</a>{" "}
          </div>
          <p className="signup-text">
            Don't have an account?
            <span>
              <Link to="/signup"> Signup</Link>
            </span>
          </p>
          <div className="login_btn_container">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
      <ToastContainer />
      <Rightbar />
    </div>
  );
};

export default LoginForm;
