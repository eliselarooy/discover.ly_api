import mongoose from 'mongoose';

const spotSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    activity: {
      type: String,
      enum: ['Running', 'Walking', 'Cycling', 'Swimming', 'Watersports'],
      required: true,
    },
    img: { type: String },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Spot', spotSchema);
