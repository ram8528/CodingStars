import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContent } from "./AppContext"; // Import useAppContext from AppContext
import { toast } from "react-toastify";

// Create TaskContext
const TaskContext = createContext();

// Custom hook to use TaskContext
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }
  return context;
};

// TaskContext Provider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedSection, setSelectedSection] = useState("all");

  const { backendUrl } = useContext(AppContent); // Get backendUrl from AppContext

  const addTask = async (taskName) => {
    try {
      const response = await axios.post(`${backendUrl}/api/task/createTask`, {
        taskName,
      });
      if (response.data.success) {
        setTasks([...tasks, response.data.task]);
        toast(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Fetch tasks using axios
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/task/taskList`);
      const data = response.data;

      if (data.success) {
        setTasks(data.taskList.tasks);
        setPendingTasks(
          data.taskList.tasks.filter((task) => !task.isCompleted)
        );
        setCompletedTasks(
          data.taskList.tasks.filter((task) => task.isCompleted)
        );
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Mark task as completed
  const markTaskAsCompleted = async (taskId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/task/markTask`, {
        taskId,
      });
      const data = response.data;

      if (data.success) {
        fetchTasks(); // Refresh tasks after marking a task as completed
      } else {
        console.error("Failed to mark task as completed");
      }
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  // Remove task
  const removeTask = async (taskId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/task/removeTask`, {
        taskId,
      });
      const data = response.data;

      if (data.success) {
        setTasks(data?.list);
        setPendingTasks(data?.list?.filter((task) => !task?.isCompleted));
        setCompletedTasks(data?.list?.filter((task) => task?.isCompleted));
      } else {
        console.error("Failed to remove task");
      }
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  // Handle section click (all, pending, completed)
  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  // Fetch tasks on initial load
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        pendingTasks,
        completedTasks,
        selectedSection,
        markTaskAsCompleted,
        removeTask,
        handleSectionClick,
        addTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
