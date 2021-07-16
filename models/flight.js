import mongoose from 'mongoose'

export {
  Flight
}

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
});

const flightSchema = new Schema({
  airline: String,
  airport: String,
  flightNo: Number,
  departs: { type: Date, defualt:timestamps},
  reviews: [ticketSchema]
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)