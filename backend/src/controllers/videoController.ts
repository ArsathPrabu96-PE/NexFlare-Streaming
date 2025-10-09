import { Request, Response } from 'express';
import Video from '../models/Video';
import WatchHistory from '../models/WatchHistory';

interface AuthRequest extends Request {
  user?: any;
}

export const getVideos = async (req: Request, res: Response) => {
  try {
    const { category, limit = 20, page = 1 } = req.query;
    const query = category ? { category } : {};
    
    const videos = await Video.find(query)
      .populate('uploadedBy', 'name')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getVideo = async (req: Request, res: Response) => {
  try {
    const video = await Video.findById(req.params.id).populate('uploadedBy', 'name');
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Increment views
    video.views += 1;
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTrending = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find({ status: 'ready' })
      .sort({ views: -1, createdAt: -1 })
      .limit(20);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const searchVideos = async (req: Request, res: Response) => {
  try {
    const { q, limit = 20 } = req.query;
    const videos = await Video.find({
      $text: { $search: q as string },
      status: 'ready'
    }).limit(Number(limit));
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { videoId, progress } = req.body;
    
    await WatchHistory.findOneAndUpdate(
      { userId: req.user.id, videoId },
      { progress, lastWatchedAt: new Date() },
      { upsert: true }
    );

    res.json({ message: 'Progress updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};