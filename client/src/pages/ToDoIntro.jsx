import React from "react";
import {
  FaCheckCircle,
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaFilter,
} from "react-icons/fa";

const TodoIntro = () => {
  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg mt-16">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Welcome to Task Organization!
      </h1>

      {/* Image Placeholder */}
      <div className="text-center mb-6">
        <img
          src="https://via.placeholder.com/400x200.png?text=To-Do+App"
          alt="To-Do App"
          className="rounded-lg shadow-lg"
        />
      </div>

      <p className="text-lg text-gray-700 mb-4">
        This simple and intuitive To-Do List application helps you stay
        organized and keep track of your tasks effortlessly.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        Whether it's work tasks, study goals, or personal projects, you can
        easily manage them with these features:
      </p>
      <ul className="list-disc pl-8 text-gray-700">
        <li className="mb-2">
          <FaPlusCircle className="inline-block text-green-500 mr-2" />
          <strong>Add Tasks:</strong> Quickly add new tasks to your to-do list
          with just a few clicks.
        </li>
        <li className="mb-2">
          <FaCheckCircle className="inline-block text-blue-500 mr-2" />
          <strong>Mark as Completed:</strong> Once a task is done, simply mark
          it as completed to stay on track.
        </li>
        <li className="mb-2">
          <FaEdit className="inline-block text-yellow-500 mr-2" />
          <strong>Edit Tasks:</strong> Modify existing tasks if you need to
          change details or rephrase them.
        </li>
        <li className="mb-2">
          <FaTrashAlt className="inline-block text-red-500 mr-2" />
          <strong>Delete Tasks:</strong> Easily remove tasks you no longer need.
        </li>
        <li className="mb-2">
          <FaFilter className="inline-block text-purple-500 mr-2" />
          <strong>Filter Tasks:</strong> View all tasks, only completed tasks,
          or only active tasks.
        </li>
        <li className="mb-2">
          <strong>Persistent Storage:</strong> Your tasks are stored safely in
          your browser's localStorage, so they remain even after you refresh.
        </li>
      </ul>
      <p className="text-lg text-gray-700 mt-6">
        Start organizing your life and never miss a task again. Let’s get
        started!
      </p>
    </div>
  );
};

export default TodoIntro;
