import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  // const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // const VercelUrl = "https://coding-stars-nove.vercel.app";
  // const backendUrl = "https://coding-stars-nove.vercel.app";

  const backendUrls = [
    import.meta.env.VITE_BACKEND_URL,
    // "https://coding-stars-nove.vercel.app",
    "https://codingstars.onrender.com",
  ];

  const backendUrl = backendUrls.find((url) => url);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("You are not logged in. Please login to continue.");
        setIsLoggedin(false); // Explicitly set the logged-in state to false
      } else {
        // toast.error("An error occurred during authentication.");
      }
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      console.log(error);

      toast.error(error.message || "An error occurred during login.");
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};

// we will get backend URL to get data from context we will use useContext
