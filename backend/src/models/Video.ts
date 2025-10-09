import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  hlsUrl?: string;
  duration: number;
  category: string;
  tags: string[];
  rating: 'G' | 'PG' | 'PG-13' | 'R';
  releaseYear: number;
  views: number;
  likes: number;
  isPremium: boolean;
  status: 'processing' | 'ready' | 'failed';
  uploadedBy: mongoose.Types.ObjectId;
}

const videoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  videoUrl: { type: String, required: true },
  hlsUrl: { type: String },
  duration: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  rating: { type: String, enum: ['G', 'PG', 'PG-13', 'R'], required: true },
  releaseYear: { type: Number, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  isPremium: { type: Boolean, default: false },
  status: { type: String, enum: ['processing', 'ready', 'failed'], default: 'processing' },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

videoSchema.index({ title: 'text', description: 'text', tags: 'text' });
videoSchema.index({ category: 1, isPremium: 1 });

export default mongoose.model<IVideo>('Video', videoSchema);