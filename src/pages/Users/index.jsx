import { useEffect, useState } from "react";
import "./style.css";
import { BASE_URL } from "../../config";
import axios from "axios";
import CustomModel from "../../components/CustomModel";
import UserInfoModel from "../../components/UserInfoModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [click, setClick] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInfoClick = (userId) => {
    setSelectedUser(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleRemove = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.delete(
        `${BASE_URL}/users/${userId}`,
        config
      );
      const result = response.data;

      if (result.status === 200) {
        toast.success(result.message);
        setClick(true);
      } else {
        toast.error(result.message);
      }
    } catch (e) {
      toast.error("Something went wrong!");
      console.error("Err part::", e);
    }
  };

  useEffect(() => {
    // Fetch user data from the API
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.get(`${BASE_URL}/users`, config);

        setUsers(data.data);
      } catch (err) {
        console.log("Err part:: " + err);
      }
    };
    fetchUsers();
  }, [isModalOpen, click]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {" "}
                <span className={`user-status ${user.status}`}>
                  {user.status}
                </span>
              </td>
              <td>{user.createdAt}</td>
              <td>
                <button onClick={() => handleInfoClick(user._id)}>
                  <BiEdit />
                </button>
              </td>
              <td>
                <button
                  style={{ backgroundColor: "#d32c1b" }}
                  onClick={() => handleRemove(user._id)}
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render the modal */}
      {selectedUser && (
        <CustomModel isOpen={isModalOpen} onClose={closeModal}>
          <UserInfoModel userId={selectedUser} />
        </CustomModel>
      )}
      <ToastContainer />
    </div>
  );
};

export default Users;
