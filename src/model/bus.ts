import mongoose from 'mongoose';
const { Schema } = mongoose;

enum Amenities {
  WiFi = 'Wi-Fi',
  TV = 'TV',
  PowerOutlets = 'Power Outlets',
}

enum BusType {
  TransitBus = 'Transit Bus',
  ShuttleBus = 'Shuttle Bus',
  ElectricBus = 'Electric Bus',
  Minibus = 'Minibus',
  SchoolBus = 'School Bus',
  DoubleDeckerBus = 'Double Decker Bus',
  SingleDeckBus = 'Single Deck Bus',
}

const busSchema = new Schema({
  seatPrice: { type: Number, required: true },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  model: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    enum: Object.values(BusType),
    required: true,
  },
  amenities: {
    type: [
      {
        type: String,
        enum: Object.values(Amenities),
      },
    ],
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Bus = mongoose.model('Bus', busSchema);

export default Bus;
