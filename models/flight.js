import mongoose from 'mongoose'

export {
  Flight
}

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type:String,
  } ,
  price: {
    type: Number, 
    min: 0,
  }
}, {
  timestamps: true
});

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United', 'Delta'],
    required: true,
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: function() {
      return new Date().getDate()
    },
  },
  tickets: [ticketSchema],
  airport: [{type: Schema.Types.ObjectId, ref: 'Destination'}]
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)