import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",  // Referencing the 'user' model
        required: true,
    },
    taskName: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true,
    },
}, { timestamps: true });

export const TaskModel = mongoose.model("TaskModel", taskSchema);
