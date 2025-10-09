import mongoose, { Document, Schema } from 'mongoose';

export interface IWatchHistory extends Document {
  userId: mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
  progress: number;
  completed: boolean;
  lastWatchedAt: Date;
}

const watchHistorySchema = new Schema<IWatchHistory>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  lastWatchedAt: { type: Date, default: Date.now }
}, { timestamps: true });

watchHistorySchema.index({ userId: 1, videoId: 1 }, { unique: true });

export default mongoose.model<IWatchHistory>('WatchHistory', watchHistorySchema);