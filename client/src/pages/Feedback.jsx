import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";


const Feedback = () => {
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        message : '',
    });
    const {backendUrl,isLoggedin} = useContext(AppContent);

    const navigate = useNavigate();

    // Handle form input change

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name] : value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name, email, message} = formData;

        if(!name || !email || !message) {
            toast.error('All fields are required!');
            return;
        }

        try {
            const { data } = await axios.post(backendUrl + "/api/feedback/submit", {
              name,
              email,
              message,
            });
      
            if (data.success) {
              navigate("/");
              toast.success("Feedback submitted successfully!");
              setFormData({ name: "", email: "", message: "" }); // Clear form
            } else {
              toast.error("Failed to submit feedback.");
            }
          } catch (error) {
            toast.error("An error occurred while submitting your feedback.");
          }
    }

    useEffect(()=>{
      if(!isLoggedin) {
        navigate("/login");
        }
    },[])

  return (
    <div className="max-x-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Feedback Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value = {formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value = {formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value = {formData.message}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
