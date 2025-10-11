import express from 'express';
import { 
  getVideos, 
  getVideo, 
  getTrending, 
  searchVideos, 
  updateProgress,
  getFeatured,
  getOriginals,
  getByGenre,
  getByCategory,
  getPremium,
  getRecommendations,
  getSimilar,
  updateViews,
  updateLikes,
  getTopRated,
  getNewReleases
} from '../controllers/videoController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getVideos);
router.get('/featured', getFeatured);
router.get('/originals', getOriginals);
router.get('/trending', getTrending);
router.get('/top-rated', getTopRated);
router.get('/new-releases', getNewReleases);
router.get('/search', searchVideos);
router.get('/genre/:genre', getByGenre);
router.get('/category/:category', getByCategory);
router.get('/:id', getVideo);
router.get('/:id/similar', getSimilar);

// Protected routes
router.get('/premium/all', protect, getPremium);
router.get('/recommendations/:userId', protect, getRecommendations);
router.post('/progress', protect, updateProgress);
router.post('/:id/views', updateViews);
router.post('/:id/like', protect, updateLikes);

export default router;