import { TaskModel } from "../models/taskModel.js";
import userModel from "../models/userModel.js";

export const removeTask = async(req,res) => {
    try {
        const result  = await TaskModel.findOneAndDelete(({
            userId : req.userId,
            _id : req.body.taskId,
        }));
        if(result) {
            const user = await userModel.findOneAndUpdate
            ({
                _id : req.userId
            }, {
                $pull : {
                    tasks : req.body.taskId,
                }
            });
            return res.status(200).json({
                success: true,
                message: "Task Deleted Successfully",
                list : null
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Could Not Deleted',
            taskList: null
        })
    }
}