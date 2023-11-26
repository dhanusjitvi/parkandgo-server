import express from "express"

import {OccupiedParkingSlots } from '../controllers/slotesController.js';

import {getTemporaryUser , reserveTemporarySlot} from '../controllers/temporaryController.js';

import {getLeaveUsers,  applyonleave} from'../controllers/leaveController.js';

const slotesRoute = express.Router();

slotesRoute.get('/OccupiedParkingSlots',OccupiedParkingSlots );

slotesRoute.get('/temporary-users',getTemporaryUser );

slotesRoute.get('/users-on-leave',getLeaveUsers);

slotesRoute.post('/users-apply-onleave',applyonleave);

slotesRoute.post('/get-temporaryslot',reserveTemporarySlot );

export default slotesRoute;