import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
      lowercase: true, //need to check if this means it makes everything lowercase or if it *requires* string to be lowercaes
    },
    text: { type: String, required: true, min: 10, max: 280 },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentsSchema);
