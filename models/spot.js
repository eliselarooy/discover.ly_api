import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 300 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

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
    comments: [commentSchema],
    img: { type: String },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Spot', spotSchema);
