import User from "../models/user.js";

import { Slot, TemporarySlot } from '../models/slotes.js'; 

export const getLeaveUsers = async (req, res) => {
    try {
      const currentDate = new Date();
  
      // Find users on leave with leave end date greater than or equal to the current date
      const usersOnLeave = await Slot.find({
        leave: true,
        leaveEndDate: { $gte: currentDate },
      });
  
      if (usersOnLeave.length === 0) {
        return res.json({ message: 'No users on leave' });
      }
  
      // Update leave status based on expired leave end dates
      const expiredLeaveUsers = usersOnLeave.filter((user) => user.leaveEndDate < currentDate);
      if (expiredLeaveUsers.length > 0) {
        // Update leave status to false for expired leave users
        await Slot.updateMany(
          { _id: { $in: expiredLeaveUsers.map((user) => user._id) } },
          { $set: { leave: false } }
        );
      }
  
      // Fetch the updated users on leave after updating the leave status
      const updatedUsersOnLeave = await Slot.find({
        leave: true,
        leaveEndDate: { $gte: currentDate },
      });
  
      const leaveUsersInfo = updatedUsersOnLeave.map((user) => ({
        userId: user.userId,
        slotNumber: user.slotNumber,
        leaveStartDate: user.leaveStartDate,
        leaveEndDate: user.leaveEndDate,
      }));
  
      // Sort leaveUsersInfo based on slotNumber
      leaveUsersInfo.sort((a, b) => a.slotNumber.localeCompare(b.slotNumber));
  
      res.json(leaveUsersInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
  


  export const applyonleave = async (req, res) => {
    try {
      console.log("Called applyonleave");
      const { slotNumber, startDate, endDate } = req.body;
  
      // Validate input, ensuring required fields are present
      if (!slotNumber || !startDate || !endDate) {
        console.log('Invalid request data:', req.body);
        return res.status(400).json({ message: 'Please provide all required fields' });
      }
  
      console.log('Received request data:', req.body);
  
      // Find the slot by slotNumber
      const slot = await Slot.findOne({ slotNumber });
  
      // Check if the slot is found
      if (!slot) {
        return res.status(404).json({ message: 'Slot not found' });
      }
  
      // Update the slot properties
      slot.leave = true;
      slot.leaveStartDate = new Date(startDate);
      slot.leaveEndDate = new Date(endDate);
  
      // Save the updated slot
      await slot.save();
  
      res.status(201).json({ message: 'Leave applied successfully' });
    } catch (error) {
      console.error('Error in applyonleave:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  

  
  