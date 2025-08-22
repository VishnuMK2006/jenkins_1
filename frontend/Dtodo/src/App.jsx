import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://13.51.206.195:5000/tasks"; // Backend endpoint

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Add new task to backend
  const addTask = async () => {
    if (!task.trim()) return;
    try {
      const res = await axios.post(API_URL, { title: task });
      setTasks([...tasks, res.data]);
      setTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Toggle task completed status
  const toggleTask = async (id, completed) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      <h1>✅ To-Do List</h1>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
        />
        <button style={styles.addBtn} onClick={addTask}>Add</button>
      </div>

      <ul style={styles.list}>
        {tasks.map((t) => (
          <li key={t._id} style={{ ...styles.listItem, textDecoration: t.completed ? "line-through" : "none" }}>
            <span onClick={() => toggleTask(t._id, t.completed)}>{t.title}</span>
            <button style={styles.deleteBtn} onClick={() => deleteTask(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "50px auto", textAlign: "center" },
  inputContainer: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "10px", fontSize: "16px" },
  addBtn: { padding: "10px 15px", cursor: "pointer" },
  list: { listStyle: "none", padding: 0 },
  listItem: { display: "flex", justifyContent: "space-between", padding: "8px", border: "1px solid #ccc", marginBottom: "5px" },
  deleteBtn: { background: "red", color: "white", border: "none", cursor: "pointer", padding: "5px" }
};

export default App;
