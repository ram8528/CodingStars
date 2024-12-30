import userModel from "../models/userModel.js";

export const getTasks = async (req, res) => {
    // console.log("User ID:", req.userId);  
    try {
        const taskList = await userModel.findById(req.userId)
            .select("-password")
            .populate('tasks')
            .exec();

        if (!taskList) {
            return res.status(404).json({
                success: false,
                message: "User not found or no tasks available"
            });
        }

        return res.status(200).json({
            success: true,
            message: "All Tasks List",
            taskList: taskList
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching tasks"
        });
    }
};
