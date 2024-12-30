import express from "express";
import createTask from "../controllers/taskController.js";
import { getTasks } from "../controllers/taskListController.js";
import { removeTask } from "../controllers/removeTaskController.js";
import { markTask } from "../controllers/markTaskController.js";
import userAuth from "../middleware/userAuth.js";


const taskRouter = express.Router();

taskRouter.post('/createTask',userAuth,createTask);
taskRouter.get('/taskList',userAuth, getTasks);
taskRouter.post('/removeTask', userAuth,removeTask);
taskRouter.post('/markTask',userAuth, markTask);


export default taskRouter;