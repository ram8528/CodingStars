// export const AppContext = createContext

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
    "https://coding-stars-nove.vercel.app"
  ];

    const backendUrl = backendUrls.find(url => url);

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async() => {
    try {
        const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
        if(data.success) {
            setIsLoggedin(true);
            getUserData()
        }
    } catch (error) {
        // toast.error(error.message);
    }
  }

  const getUserData = async () => {
    try {
      const {data} = await axios.get(backendUrl + "/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(
        error.message || "An error occurred during login."
      );
    }
  };

  useEffect(()=> {
    getAuthState();
  }, [])
  

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
