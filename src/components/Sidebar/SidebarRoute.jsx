import { Route, Routes } from "react-router-dom";
import Sidebar from ".";
import NoPage from "../../pages/NoPage";
import Tasks from "../../pages/Tasks";
import Users from "../../pages/Users";
import Navbar from "../Navbar";

const SidebarRoute = () => {
  return (
    <Sidebar>
      <Navbar />
      <Routes path="/">
        <Route path="users" element={<Users />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Sidebar>
  );
};

export default SidebarRoute;
