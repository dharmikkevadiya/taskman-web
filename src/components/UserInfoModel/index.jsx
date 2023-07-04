import { useEffect, useState } from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { BASE_URL } from "../../config";

const UserInfoModel = ({ userId }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Fetch user data from the API
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.get(`${BASE_URL}/users/${userId}`, config);

        setUser(data.data);
      } catch (e) {
        toast.error("Something went wrong. Please try again!");
        console.error("Err part::", e);
      }
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("token:::", token);
      console.log("user:::", user);

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.put(
        `${BASE_URL}/users/${userId}`,
        user,
        config
      );
      const result = response.data;

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="user_info_main">
      <h1>User Details</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            readOnly
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Update
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserInfoModel;
