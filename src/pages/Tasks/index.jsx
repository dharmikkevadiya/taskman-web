import { useEffect, useState } from "react";
import "./style.css";
import { BASE_URL } from "../../config";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.get(`${BASE_URL}/tasks`, config);

        setTasks(data.data);
      } catch (err) {
        console.log("Err part:: " + err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>User</th>
            <th>Note</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task._id}</td>
              <td>{task.title}</td>
              <td>{task.user}</td>
              <td>{task.note}</td>
              <td>
                <span className={` badge ${task.status}`}>{task.status}</span>
              </td>
              <td>{task.createdAt}</td>
              <td>
                <button style={{ backgroundColor: "#d32c1b" }}>
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
