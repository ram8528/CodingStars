import React from 'react';
import { Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Feedback from './pages/Feedback';
import Started from './pages/started';
import Task from './pages/Task';
import { TaskProvider } from './context/TaskContext.jsx';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path= '/' element = {<Home/>} />
        <Route path= '/login' element = {<Login/>} />
        <Route path= '/email-verify' element = {<EmailVerify/>} />
        <Route path= '/reset-password' element = {<ResetPassword/>} />
        <Route path = '/feedback' element = {<Feedback/>}/>
        <Route path = '/get-started' element = {<Started/>} />
        {/* <Route path = '/task' element = {<Task/>}/> */}
        <Route
          path="/task"
          element={
            <TaskProvider>
              <Task />
            </TaskProvider>
          }
        />
      </Routes>
    </div>
  )
}

export default App