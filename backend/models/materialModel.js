import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  title: String,
  desc: String,
  category: {
    type: String,
    enum: ['notes', 'pyq', 'ebooks', 'assignments'],
    required: true,
  },
  fileUrl: String,      // PDF from Cloudinary
  imgUrl: String,       // Optional thumbnail image
  public_id: String,    // ✅ Needed for deletion from Cloudinary
}, { timestamps: true });

export default mongoose.model('Material', materialSchema);
