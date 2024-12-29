import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      res.status(401).json({ success: false, message: "User Not found" });
    }
    res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
