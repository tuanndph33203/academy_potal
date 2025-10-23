import mongoose from 'mongoose';

const ViewSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  items: [
    {
      slug: { type: String, required: true },
      view: { type: Number, required: true },
    },
  ],
});

export const ViewModel = mongoose.models['MovieView'] || mongoose.model('MovieView', ViewSchema);
