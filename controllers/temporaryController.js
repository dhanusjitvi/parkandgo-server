import User from "../models/user.js";

import { Slot, TemporarySlot } from "../models/slotes.js";

export const getTemporaryUser = async (req, res) => {
  try {
    const temporaryUsers = await TemporarySlot.find();

    if (temporaryUsers.length > 0) {
      const user = temporaryUsers[0];
      res.json({
        userName: user.name,
        startDate: user.startDate,
        endDate: user.endDate,
        slotNumber: user.slotNumber,
      });
    } else {
      res.json({ message: "No one is using the temporary slot." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const reserveTemporarySlot = async (req, res) => {
    console.log("callle");
  try {
    const { userName, slotNumber, startDate, endDate } = req.body;

    const newUser = await User.findOne({ name: userName });

    if (!newUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Call the function to reserve a temporary slot
    const bookedSlot = await reserveTemporarySlot(newUser, new Date());

    if (bookedSlot) {
      // If a temporary slot is successfully reserved, you can proceed to save the data
      const newSlot = new Slot({
        userId: newUser._id,
        slotNumber,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });

      await newSlot.save();

      // Respond with success
      return res
        .status(200)
        .json({ message: "Parking slot booked successfully" });
    } else {
      // If no temporary slots are available
      return res.status(404).json({ error: "No available parking slots" });
    }
  } catch (error) {
    console.error("Error booking parking slot:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteExpiredTemporarySlots = async (currentDate) => {
  try {
    await TemporarySlot.deleteMany({ endDate: { $lt: currentDate } });
  } catch (error) {
    console.error("Error deleting expired temporary slots:", error);
    throw error;
  }
};
