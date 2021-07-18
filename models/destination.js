import mongoose from 'mongoose'

export {
  Destination
}

const Schema = mongoose.Schema

const destinationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
})

const Destination = mongoose.model('Destination', destinationSchema)