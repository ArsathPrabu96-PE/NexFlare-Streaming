import express from 'express';
import { protect } from '../middleware/auth';
import WatchHistory from '../models/WatchHistory';

const router = express.Router();

router.get('/profile', protect, async (req: any, res) => {
  res.json(req.user);
});

router.get('/history', protect, async (req: any, res) => {
  try {
    const history = await WatchHistory.find({ userId: req.user.id })
      .populate('videoId')
      .sort({ lastWatchedAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;