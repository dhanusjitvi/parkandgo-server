import User from "../models/user.js";

import { Slot, TemporarySlot } from '../models/slotes.js'; 


export const OccupiedParkingSlots = async (req, res) => {
    try {
      const getAllslots = await Slot.find().sort({ createdAt: -1 });
  
      console.log(getAllslots);
      res.json({
        status: true,
        OccupiedParkingSlots : getAllslots ,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  

