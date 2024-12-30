import { TaskModel } from "../models/taskModel.js";
import userModel from "../models/userModel.js";

const createTask = async (req, res) => {
    const { taskTitle } = req.body; // Get taskTitle from the request body
    const userId = req.userId; // Access the userId set by the userAuth middleware

    try {
        if (!taskTitle) {
            return res.status(401).json({
                success: false,
                message: "Please provide the Task Title",
            });
        }

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is missing or invalid",
            });
        }

        const result = await TaskModel.create({
            userId, // Use the userId from the decoded JWT token
            taskName: taskTitle, // Map taskTitle to taskName
        });

        
        if (result) {
            const user = await userModel.findOneAndUpdate(
                { _id: userId },
                { $push: { tasks: result._id } }, // Add task to the user's tasks array
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found or task addition failed.",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Task added successfully",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(403).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export default createTask;
