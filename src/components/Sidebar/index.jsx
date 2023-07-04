import { NavLink } from "react-router-dom";
import "./style.css";
import { FaTasks, FaUser, FaMailBulk, FaListAlt } from "react-icons/fa";
import logo from "../../assets/logo1.png";
import Navbar from "../Navbar";

const Sidebar = ({ children }) => {
  const menuItems = [
    {
      path: "/users",
      name: "Users",
      icon: <FaUser />,
    },
    {
      path: "/tasks",
      name: "Tasks",
      icon: <FaTasks />,
    },
    {
      path: "/admins",
      name: "Admins",
      icon: <FaUser />,
    },
    {
      path: "/emails",
      name: "Emails",
      icon: <FaMailBulk />,
    },
    {
      path: "/reports",
      name: "Reports",
      icon: <FaListAlt />,
    },
  ];

  return (
    <div className="container">
      <div className="sidebar">
        <div className="top_section">
          <img src={logo} alt="" className="logo" />
          <h2 className="logo-text">TaskMan</h2>
        </div>

        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="nav_link"
            activeclassname="active"
          >
            <div className="icon">{item.icon} </div>
            <div>{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>
        <Navbar />

        {children}
      </main>
    </div>
  );
};

export default Sidebar;
