import express from 'express';
import { getVideos, getVideo, getTrending, searchVideos, updateProgress } from '../controllers/videoController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/', getVideos);
router.get('/trending', getTrending);
router.get('/search', searchVideos);
router.get('/:id', getVideo);
router.post('/progress', protect, updateProgress);

export default router;