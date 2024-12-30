import { TaskModel } from "../models/taskModel.js";

export const markTask = async(req,res) => {
    console.log(req.body.taskId);
    try {
        const task = await TaskModel.findOneAndUpdate(
            {
                _id : req.body.taskId,
                userId: req.userId,
            },
            [
                {
                    $set: {
                        isCompleted: {
                            $eq : [false, "$isCompleted"],
                        }
                    }
                }
            ],
            { new: true }
        );

        if(task) {
            return res.status(200).json({
                success: true,
                message: "Task Updated!" , taskList : task
            })
        } else{
            return res.status(404).json({
                success: false,
                message: "Task Not Found!" ,
            })
        }
    } catch (error) {
        return res.status(401)
        .json({
            success: false,
            message: "Could not updated!",
            taskList : null
        })
    }
}