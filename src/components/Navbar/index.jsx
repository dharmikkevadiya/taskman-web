import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import "./style.css";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  const fullName = `${user?.firstName} ${user?.lastName}`;

  async function logout() {
    // localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
  }
  return (
    <nav>
      <h1 style={{ padding: "10px" }}>Welcome [ {fullName} ] </h1>

      <IoMdLogOut className="logoutIcon" onClick={logout} />
    </nav>
  );
};

export default Navbar;
