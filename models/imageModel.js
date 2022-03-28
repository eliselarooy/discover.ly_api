import mongoose from 'mongoose'
const imageSchema = new mongoose.Schema({
  caption: { type: String, required: true },
  url: { type: String, required: true }
})
export default mongoose.model('Image', imageSchema)