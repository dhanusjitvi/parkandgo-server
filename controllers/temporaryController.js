import User from "../models/user.js";

import { Slot, TemporarySlot } from '../models/slotes.js'; 


export const getTemporaryUser = async (req, res) => {
    try {
      const temporaryUsers = await TemporarySlot.find();
  
      if (temporaryUsers.length > 0) {
        // If there are temporary users, send user details including slot number
        const user = temporaryUsers[0]; // Assuming you only want details of the first user
        res.json({
          userName: user.name,
          startDate: user.startDate,
          endDate: user.endDate,
          slotNumber: user.slotNumber, // Assuming there's a slotNumber field in TemporarySlot
        });
      } else {
        // If no one is using the temporary slot
        res.json({ message: 'No one is using the temporary slot.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  export const reserveTemporarySlot = async (newUser, currentDate) => {
    try {
      // Find available temporary slots with end dates after the current date
      const availableTemporarySlots = await TemporarySlot.find({
        endDate: { $gte: currentDate },
      }).sort({ startDate: 1 });
  
      // Reserve the first available temporary slot for the new user
      if (availableTemporarySlots.length > 0) {
        const reservedSlot = availableTemporarySlots[0];
        
        // Create a new Slot record for the new user using the temporary slot details
        const newSlot = new Slot({
          userId: newUser._id,
          slotNumber: reservedSlot.slotNumber,
          endDate: reservedSlot.endDate,
        });
  
        // Save the new slot
        await newSlot.save();
  
        // Delete the reserved temporary slot
        await TemporarySlot.findByIdAndDelete(reservedSlot._id);
  
        return newSlot;
      } else {
        return null; // No available temporary slots
      }
    } catch (error) {
      console.error('Error reserving temporary slot:', error);
      throw error;
    }
  };
  
  // Function to automatically delete expired temporary slots
  export const deleteExpiredTemporarySlots = async (currentDate) => {
    try {
      // Find and delete temporary slots with end dates before the current date
      await TemporarySlot.deleteMany({ endDate: { $lt: currentDate } });
    } catch (error) {
      console.error('Error deleting expired temporary slots:', error);
      throw error;
    }
  };