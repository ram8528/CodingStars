import React, { useContext, useEffect, useState } from "react";
import { useTaskContext } from "../context/TaskContext.jsx";
import { AppContent } from "../context/AppContext.jsx";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "./Footer.jsx";

const Task = () => {
  const {
    tasks,
    pendingTasks,
    completedTasks,
    selectedSection,
    markTaskAsCompleted,
    removeTask,
    handleSectionClick,
    addTask,
  } = useTaskContext();

  const { userData, isLoggedin } = useContext(AppContent);

  const [taskName, settaskName] = useState("");
  const navigate = useNavigate();

  const renderTasks = () => {
    if (selectedSection === "all") {
      return tasks;
    } else if (selectedSection === "pending") {
      return pendingTasks;
    } else if (selectedSection === "completed") {
      return completedTasks;
    }
  };

  if (!isLoggedin) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <p>You must be logged in to use</p>
        <p className="font-bold text-red-500 underline">Task Organizer</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (taskName.trim() === "") return;
    addTask(taskName);
    settaskName("");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto pt-10 mt-10 px-4">
        <h1 className="font-bold text-center">
          Welcome,{" "}
          <span className="text-2xl md:text-3xl bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 text-transparent bg-clip-text animate-pulse">
            {userData ? userData.name : "Coding Star"}!
          </span>
          <br />
          <span className="text-3xl md:text-4xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-transparent bg-clip-text animate-pulse">
            Task Organizer
          </span>
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
          {/* Left Side - Add Task Form */}
          <form
            onSubmit={handleCreateTask}
            className="w-full md:w-[40%] p-4 md:p-6 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <input
              type="text"
              value={taskName}
              onChange={(e) => settaskName(e.target.value)}
              placeholder="Enter task name"
              className="w-full p-3 md:p-4 rounded-lg text-gray-700 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            />
            <button
              className="w-full mt-4 p-2 md:p-3 text-white bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg shadow-md hover:shadow-lg focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50 transition-all duration-300"
              type="submit"
            >
              Add Task
            </button>
          </form>

          {/* Right Side - Task List */}
          <div className="w-full md:w-[55%] p-4 md:p-6 border bg-gray-800 rounded-xl shadow-lg max-h-[70vh] md:max-h-[90vh] overflow-y-auto">
            <table className="w-full bg-gray-900 text-white rounded-t-md sticky top-0 z-10">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-2 md:py-3 px-4 md:px-6 text-sm font-medium tracking-wider text-gray-300 uppercase"
                  >
                    <button
                      className="uppercase hover:text-pink-400 transition-colors duration-200"
                      onClick={() => handleSectionClick("all")}
                    >
                      All Tasks
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="py-2 md:py-3 px-4 md:px-6 text-sm font-medium tracking-wider text-gray-300"
                  >
                    <button
                      className="uppercase hover:text-pink-400 transition-colors duration-200"
                      onClick={() => handleSectionClick("pending")}
                    >
                      Pending Tasks
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="py-2 md:py-3 px-4 md:px-6 text-sm font-medium tracking-wider text-gray-300 uppercase"
                  >
                    <button
                      className="uppercase hover:text-pink-400 transition-colors duration-200"
                      onClick={() => handleSectionClick("completed")}
                    >
                      Completed Tasks
                    </button>
                  </th>
                </tr>
              </thead>
            </table>

            <table className="w-full divide-gray-700 border-4 text-center">
              <thead className="bg-gray-800 dark:bg-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="py-2 md:py-3 px-4 md:px-6 text-sm font-medium tracking-wider text-gray-300"
                  >
                    Task Name
                  </th>
                  <th
                    scope="col"
                    className="py-2 md:py-3 px-4 md:px-6 text-sm font-medium tracking-wider text-gray-300"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-700 divide-y divide-gray-600">
                {renderTasks()?.map((task) => (
                  <tr
                    className="hover:bg-gray-600 dark:hover:bg-gray-700"
                    key={task._id}
                  >
                    <td className="py-3 md:py-4 px-4 md:px-6 text-sm font-medium text-amber-400">
                      <span>{task.taskName}</span>
                    </td>
                    <td className="py-3 md:py-4 px-4 md:px-6 text-sm font-medium text-white">
                      <button
                        className="relative text-green-500 hover:underline mr-2 md:mr-4"
                        onClick={() => markTaskAsCompleted(task._id)}
                      >
                        {!task.isCompleted ? (
                          <IoCheckmarkCircleOutline size={18} />
                        ) : (
                          <IoMdCheckmarkCircle size={18} />
                        )}
                        <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-0 text-green-400 opacity-0 hover:opacity-100 hover:block transition-opacity duration-200">
                          Done
                        </span>
                      </button>
                      <button
                        className="relative text-red-500 hover:underline"
                        onClick={() => removeTask(task._id)}
                      >
                        <FaXmark size={18} />
                        <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-0 text-red-400 opacity-0 hover:opacity-100 hover:block transition-opacity duration-200">
                          Remove
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Task;
