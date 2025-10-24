import mongoose from 'mongoose';

export async function connectDB() {
  const uri =
    process.env['MONGO_URI'] ||
    'mongodb+srv://<user_name>:<password>@cluster0.xsa2v.mongodb.net/<database_name>?retryWrites=true&w=majority';
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
  }
}
