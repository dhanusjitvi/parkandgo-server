import User from "../models/user.js";

import { Slot, TemporarySlot } from '../models/slotes.js'; 


export const OccupiedParkingSlots = async (req, res) => {
  try {
    const getAllSlotsWithUserInfo = await Slot.find()
      .populate({
        path: 'userId',
        select: 'name number', // Fields you want to select from the User model
      })
      .sort({ createdAt: -1 });

    console.log(getAllSlotsWithUserInfo);
    res.json({
      status: true,
      OccupiedParkingSlots: getAllSlotsWithUserInfo,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
};

  

