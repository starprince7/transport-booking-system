import mongoose from 'mongoose';
import Bus from './bus';
const { Schema } = mongoose;

const seatBookingSchema = new Schema({
  bus: {
    type: Schema.Types.ObjectId,
    ref: Bus,
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
  passengerName: {
    type: String,
    default: '',
  },
  bookingDate: {
    type: Date,
  },
  departureDate: {
    type: Date,
  },
  price: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const Seat = mongoose.model('Seat', seatBookingSchema);

export default Seat;
