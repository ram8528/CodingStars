import express from'express';
import Feedback from '../models/feedbackModel.js';

const feedbackRouter = express.Router();

feedbackRouter.post('/submit' , async(req,res) => {
    const {name, email,message} = req.body;

    try {
        const newFeedback = new Feedback({
            name, 
            email, 
            message,
        });

        await newFeedback.save();
        res.status(200).json({success: true, message: 'Feedback Submitted Successfully'});

    } catch (error) {
        res.
        status(500).json({
            success: false,
            message: "Failed to submit Feedback"
        })
    }
});

export default feedbackRouter;
