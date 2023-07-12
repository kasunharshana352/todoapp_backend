const User = require("../models/User");

const updateUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, email } = req.body;

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = {
  updateUser,
  deleteUser,
};
