import express from "express"

import {OccupiedParkingSlots } from '../controllers/slotesController.js';

const slotesRoute = express.Router();

slotesRoute.get('/OccupiedParkingSlots',OccupiedParkingSlots )



export default slotesRoute;