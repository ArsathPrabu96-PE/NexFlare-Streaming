export const mockVideos = [
  {
    _id: '1',
    title: 'Big Buck Bunny',
    description: 'A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: 596,
    category: 'Animation',
    rating: 'G',
    releaseYear: 2008,
    views: 1250000,
    likes: 45000,
    isPremium: false
  },
  {
    _id: '2',
    title: 'Elephant Dream',
    description: 'The first open movie from the Blender Foundation, made with open source software.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: 653,
    category: 'Animation',
    rating: 'PG',
    releaseYear: 2006,
    views: 890000,
    likes: 32000,
    isPremium: true
  },
  {
    _id: '3',
    title: 'For Bigger Blazes',
    description: 'HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: 15,
    category: 'Commercial',
    rating: 'G',
    releaseYear: 2013,
    views: 2100000,
    likes: 78000,
    isPremium: false
  },
  {
    _id: '4',
    title: 'For Bigger Escape',
    description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: 15,
    category: 'Commercial',
    rating: 'G',
    releaseYear: 2013,
    views: 1800000,
    likes: 65000,
    isPremium: true
  },
  {
    _id: '5',
    title: 'For Bigger Fun',
    description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: 60,
    category: 'Commercial',
    rating: 'G',
    releaseYear: 2013,
    views: 1500000,
    likes: 55000,
    isPremium: false
  },
  {
    _id: '6',
    title: 'For Bigger Joyrides',
    description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: 15,
    category: 'Commercial',
    rating: 'G',
    releaseYear: 2013,
    views: 1200000,
    likes: 42000,
    isPremium: true
  },
  {
    _id: '7',
    title: 'Sintel',
    description: 'A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    duration: 888,
    category: 'Animation',
    rating: 'PG',
    releaseYear: 2010,
    views: 3200000,
    likes: 125000,
    isPremium: true
  },
  {
    _id: '8',
    title: 'Subaru Outback On Street And Dirt',
    description: 'Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    duration: 594,
    category: 'Automotive',
    rating: 'G',
    releaseYear: 2015,
    views: 980000,
    likes: 35000,
    isPremium: false
  },
  {
    _id: '9',
    title: 'Tears of Steel',
    description: 'In an apocalyptic future, a group of soldiers and scientists takes refuge in Amsterdam.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    duration: 734,
    category: 'Sci-Fi',
    rating: 'PG-13',
    releaseYear: 2012,
    views: 2800000,
    likes: 98000,
    isPremium: true
  },
  {
    _id: '10',
    title: 'Volkswagen GTI Review',
    description: 'The Smoking Tire heads out to Adams Motorsports Park in Riverside, CA to test the most requested car of 2010.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    duration: 1253,
    category: 'Automotive',
    rating: 'G',
    releaseYear: 2013,
    views: 1100000,
    likes: 48000,
    isPremium: false
  }
];

export const getTrendingVideos = () => {
  return mockVideos.sort((a, b) => b.views - a.views).slice(0, 6);
};

export const getVideosByCategory = (category: string) => {
  return mockVideos.filter(video => video.category.toLowerCase() === category.toLowerCase());
};

export const getPremiumVideos = () => {
  return mockVideos.filter(video => video.isPremium);
};

export const getFreeVideos = () => {
  return mockVideos.filter(video => !video.isPremium);
};