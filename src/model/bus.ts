import mongoose from 'mongoose';
const { Schema } = mongoose;

enum Amenities {
  WiFi = 'Wi-Fi',
  TV = 'TV',
  PowerOutlets = 'Power Outlets',
  AirConditioner = 'Air Conditioner',
  FreeDrinks = 'Free Drinks',
  FreeMeal = 'Free Meal',
  OnboardToilet = 'Onboard Toilet',
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
  departureDate: {
    type: Date,
  },
  model: {
    type: String,
    required: true,
  },
  // This is the total passenger capacity excluding a pilot or driver.
  capacity: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  busType: {
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
  // ************* This is defined as a trip: [ Origin - Destination ].
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  }, // ************* This is defined as a trip: [ Origin - Destination ].
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
