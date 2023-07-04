import { Route, Routes } from "react-router-dom";
import Sidebar from ".";
import NoPage from "../../pages/NoPage";
import Tasks from "../../pages/Tasks";
import Users from "../../pages/Users";

const SidebarRoute = () => {
  return (
    <Sidebar>
      <Routes path="/">
        <Route path="users" element={<Users />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Sidebar>
  );
};

export default SidebarRoute;
