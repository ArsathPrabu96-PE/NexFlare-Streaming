import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  description: string;
  thumbnail: string;
  backdropImage?: string;
  videoUrl: string;
  hlsUrl?: string;
  trailerUrl?: string;
  duration: number;
  category: string;
  genre: string[];
  tags: string[];
  rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
  imdbRating?: number;
  tmdbRating?: number;
  releaseYear: number;
  releaseDate: Date;
  director: string[];
  cast: string[];
  country: string[];
  language: string[];
  spokenLanguages: string[];
  views: number;
  likes: number;
  dislikes: number;
  isPremium: boolean;
  isFeatured: boolean;
  isOriginal: boolean;
  status: 'processing' | 'ready' | 'failed';
  quality: '720p' | '1080p' | '4K' | '8K';
  subtitles: string[];
  audioTracks: string[];
  uploadedBy: mongoose.Types.ObjectId;
  seasons?: number; // For TV shows
  episodes?: number; // For TV shows
  type: 'movie' | 'tv-show' | 'documentary' | 'short';
}

const videoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  backdropImage: { type: String },
  videoUrl: { type: String, required: true },
  hlsUrl: { type: String },
  trailerUrl: { type: String },
  duration: { type: Number, required: true },
  category: { type: String, required: true },
  genre: [{ type: String, required: true }],
  tags: [{ type: String }],
  rating: { type: String, enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'], required: true },
  imdbRating: { type: Number, min: 0, max: 10 },
  tmdbRating: { type: Number, min: 0, max: 10 },
  releaseYear: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  director: [{ type: String }],
  cast: [{ type: String }],
  country: [{ type: String }],
  spokenLanguages: [{ type: String }], // Spoken languages
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  isPremium: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isOriginal: { type: Boolean, default: false },
  status: { type: String, enum: ['processing', 'ready', 'failed'], default: 'processing' },
  quality: { type: String, enum: ['720p', '1080p', '4K', '8K'], default: '1080p' },
  subtitles: [{ type: String }],
  audioTracks: [{ type: String }],
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  seasons: { type: Number },
  episodes: { type: Number },
  type: { type: String, enum: ['movie', 'tv-show', 'documentary', 'short'], default: 'movie' }
}, { timestamps: true });

videoSchema.index({ title: 'text', description: 'text', tags: 'text', cast: 'text', director: 'text' });
videoSchema.index({ category: 1, isPremium: 1 });
videoSchema.index({ genre: 1, releaseYear: -1 });
videoSchema.index({ isFeatured: 1, isOriginal: 1 });
videoSchema.index({ imdbRating: -1, tmdbRating: -1 });
videoSchema.index({ views: -1, likes: -1 });

export default mongoose.model<IVideo>('Video', videoSchema);