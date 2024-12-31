import React, { useContext, useEffect, useState } from "react";
import { useTaskContext } from "../context/TaskContext.jsx"; // Import TaskContext
import { AppContent } from "../context/AppContext.jsx"; // Import AppContext for userData and isLoggedIn
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
const Task = () => {
  const {
    tasks,
    pendingTasks,
    completedTasks,
    selectedSection,
    markTaskAsCompleted,
    removeTask,
    handleSectionClick,
    addTask, // Assuming this function exists in TaskContext
  } = useTaskContext(); // Use task context

  const { userData, isLoggedin } = useContext(AppContent); // Use global app context (user data, authentication)

  const [taskName, settaskName] = useState(""); // State to hold the new task name

  const renderTasks = () => {
    if (selectedSection === "all") {
      return tasks;
    } else if (selectedSection === "pending") {
      return pendingTasks;
    } else if (selectedSection === "completed") {
      return completedTasks;
    }
  };

  // Handle task creation
  const handleCreateTask = (e) => {
    e.preventDefault(); // Prevent default form behavior
    if (taskName.trim() === "") return; // Prevent creating task if the name is empty
    addTask(taskName); // Call the addTask function from TaskContext to add a new task
    settaskName(""); // Clear the input field after submission
  };

  return (
    <div>
      <h1>Welcome, {userData ? userData.name : "Coding Star"}</h1>

      {/* Task creation form */}
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => settaskName(e.target.value)}
          placeholder="Enter new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="w-[50%]  mx-auto p-4 border bg-black rounded-lg max-h-[90vh] overflow-y-auto">
        <table className="w-full bg-gray-100 rounded-t-md text-center  ">
          <tr className="">
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase "
            >
              <button
                className="uppercase"
                onClick={() => handleSectionClick("all")}
              >
                All Tasks
              </button>
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-gray-700"
            >
              <button
                className="uppercase"
                onClick={() => handleSectionClick("pending")}
              >
                Pending Tasks
              </button>
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase"
            >
              <button
                className="uppercase"
                onClick={() => handleSectionClick("completed")}
              >
                Completed Tasks
              </button>
            </th>
          </tr>
        </table>
        <table className="w-full divide-gray-700 border-4 text-center ">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
              >
                Task Name
              </th>
              <th
                scope="col"
                className="py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 ">
            {renderTasks()?.map((task) => (
              <tr
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                key={task._id}
              >
                <td className="py-4 px-6 text-sm font-medium text-white">
                  <span>{task.taskName}</span>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-white">
                  <button
                    className="text-blue-500 hover:underline mr-4"
                    onClick={() => markTaskAsCompleted(task._id)}
                  >
                    {!task.isCompleted ? (
                      <IoCheckmarkCircleOutline size={20} />
                    ) : (
                      <IoMdCheckmarkCircle size={20} />
                    )}
                  </button>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => removeTask(task._id)}
                  >
                    <FaXmark size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
