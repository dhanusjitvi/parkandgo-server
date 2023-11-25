import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model, change it accordingly
    required: true,
  },
  slotNumber: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  leave: {
    type: Boolean,
    default: false,
  },
  leaveStartDate: {
    type: Date,
  },
  leaveEndDate: {
    type: Date,
  },
});

const temporarySlotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Slot = mongoose.model('Slot', slotSchema);
const TemporarySlot = mongoose.model('TemporarySlot', temporarySlotSchema);

export { Slot, TemporarySlot };
