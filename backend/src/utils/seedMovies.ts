import mongoose from 'mongoose';
import Video from '../models/Video';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

// Netflix-like movie database
const movieDatabase = [
  // Action Movies
  {
    title: "Dark Thunder",
    description: "A high-octane action thriller where an elite special forces operative must stop a terrorist organization from unleashing chaos in major cities worldwide.",
    thumbnail: "https://image.tmdb.org/t/p/w500/dark-thunder-poster.jpg",
    backdropImage: "https://image.tmdb.org/t/p/original/dark-thunder-backdrop.jpg",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    trailerUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    duration: 142,
    category: "Action",
    genre: ["Action", "Thriller", "Adventure"],
    tags: ["explosions", "military", "terrorism", "special forces"],
    rating: "R",
    imdbRating: 8.2,
    tmdbRating: 8.0,
    releaseYear: 2024,
    releaseDate: new Date("2024-06-15"),
    director: ["Michael Bay", "Christopher Nolan"],
    cast: ["Chris Evans", "Scarlett Johansson", "Idris Elba", "Charlize Theron"],
    country: ["USA", "UK"],
    spokenLanguages: ["English", "Spanish"],
    isPremium: true,
    isFeatured: true,
    isOriginal: true,
    quality: "4K",
    subtitles: ["English", "Spanish", "French", "German"],
    audioTracks: ["English 5.1", "Spanish 5.1"],
    type: "movie"
  },
  {
    title: "Neon Heist",
    description: "In a cyberpunk future, a team of elite hackers and thieves plan the ultimate digital heist against a mega-corporation controlling the world's data.",
    thumbnail: "https://image.tmdb.org/t/p/w500/neon-heist-poster.jpg",
    backdropImage: "https://image.tmdb.org/t/p/original/neon-heist-backdrop.jpg",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    trailerUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    duration: 127,
    category: "Action",
    genre: ["Action", "Sci-Fi", "Crime"],
    tags: ["cyberpunk", "heist", "hacking", "futuristic"],
    rating: "PG-13",
    imdbRating: 7.8,
    tmdbRating: 7.5,
    releaseYear: 2024,
    releaseDate: new Date("2024-03-22"),
    director: ["Lana Wachowski"],
    cast: ["Ryan Gosling", "Margot Robbie", "Oscar Isaac", "Lupita Nyong'o"],
    country: ["USA"],
    spokenLanguages: ["English"],
    isPremium: false,
    isFeatured: true,
    isOriginal: true,
    quality: "4K",
    subtitles: ["English", "Spanish", "Mandarin"],
    audioTracks: ["English Dolby Atmos"],
    type: "movie"
  },

  // Drama Movies
  {
    title: "The Last Letter",
    description: "A heartwarming drama about a woman who discovers a box of letters from her late grandmother, leading her on a journey of self-discovery and family secrets.",
    thumbnail: "https://image.tmdb.org/t/p/w500/last-letter-poster.jpg",
    backdropImage: "https://image.tmdb.org/t/p/original/last-letter-backdrop.jpg",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    trailerUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    duration: 118,
    category: "Drama",
    genre: ["Drama", "Family"],
    tags: ["family", "emotional", "letters", "discovery"],
    rating: "PG",
    imdbRating: 8.5,
    tmdbRating: 8.3,
    releaseYear: 2024,
    releaseDate: new Date("2024-01-12"),
    director: ["Greta Gerwig"],
    cast: ["Saoirse Ronan", "Meryl Streep", "Timothée Chalamet", "Emma Stone"],
    country: ["USA"],
    spokenLanguages: ["English"],
    isPremium: false,
    isFeatured: false,
    isOriginal: false,
    quality: "1080p",
    subtitles: ["English", "Spanish"],
    audioTracks: ["English 5.1"],
    type: "movie"
  },

  // Comedy Movies
  {
    title: "Office Space Odyssey",
    description: "A hilarious comedy about a group of office workers who accidentally discover their company is a front for interdimensional travel, leading to cosmic workplace chaos.",
    thumbnail: "https://image.tmdb.org/t/p/w500/office-odyssey-poster.jpg",
    backdropImage: "https://image.tmdb.org/t/p/original/office-odyssey-backdrop.jpg",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    trailerUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    duration: 102,
    category: "Comedy",
    genre: ["Comedy", "Sci-Fi"],
    tags: ["office", "workplace", "interdimensional", "funny"],
    rating: "PG-13",
    imdbRating: 7.2,
    tmdbRating: 7.0,
    releaseYear: 2024,
    releaseDate: new Date("2024-04-01"),
    director: ["Jordan Peele", "Taika Waititi"],
    cast: ["Seth Rogen", "Kristen Wiig", "Donald Glover", "Aubrey Plaza"],
    country: ["USA"],
    spokenLanguages: ["English"],
    isPremium: false,
    isFeatured: false,
    isOriginal: true,
    quality: "1080p",
    subtitles: ["English"],
    audioTracks: ["English 5.1"],
    type: "movie"
  },

  // Horror Movies
  {
    title: "The Midnight Archive",
    description: "A supernatural horror film about a librarian who discovers that books in an ancient library come alive at midnight, releasing their darkest characters into reality.",
    thumbnail: "https://image.tmdb.org/t/p/w500/midnight-archive-poster.jpg",
    backdropImage: "https://image.tmdb.org/t/p/original/midnight-archive-backdrop.jpg",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    trailerUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    duration: 95,
    category: "Horror",
    genre: ["Horror", "Supernatural", "Mystery"],
    tags: ["library", "books", "supernatural", "midnight"],
    rating: "R",
    imdbRating: 7.5,
    tmdbRating: 7.3,
    releaseYear: 2024,
    releaseDate: new Date("2024-10-31"),
    director: ["Ari Aster"],
    cast: ["Tilda Swinton", "Oscar Isaac", "Lupita Nyong'o", "Brian Cox"],
    country: ["USA", "UK"],
    spokenLanguages: ["English"],
    isPremium: true,
    isFeatured: true,
    isOriginal: true,
    quality: "4K",
    subtitles: ["English", "Spanish", "French"],
    audioTracks: ["English Dolby Atmos"],
    type: "movie"
  },

  // Sci-Fi Movies
  {
    title: "Quantum Paradox",
    description: "In a near future where quantum computing has revolutionized reality, a physicist discovers that parallel universes are bleeding into our world, threatening existence itself.",
    thumbnail: "https://image.tmdb.org/t/p/w500/quantum-paradox-poster.jpg",
    backdropImage: "https://image.tmdb.org/t/p/original/quantum-paradox-backdrop.jpg",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    trailerUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    duration: 156,
    category: "Sci-Fi",
    genre: ["Sci-Fi", "Thriller", "Drama"],
    tags: ["quantum", "parallel universe", "physics", "reality"],
    rating: "PG-13",
    imdbRating: 8.7,
    tmdbRating: 8.5,
    releaseYear: 2024,
    releaseDate: new Date("2024-05-17"),
    director: ["Denis Villeneuve", "Christopher Nolan"],
    cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker", "Michael Shannon"],
    country: ["USA", "Canada"],
    spokenLanguages: ["English"],
    isPremium: true,
    isFeatured: true,
    isOriginal: true,
    quality: "8K",
    subtitles: ["English", "Spanish", "French", "German", "Japanese"],
    audioTracks: ["English Dolby Atmos", "English 7.1"],
    type: "movie"
  },

  // TV Shows
  {
    title: "Neural Network",
    description: "A cyberpunk series following a team of hackers in 2087 who discover that AI has been secretly controlling human society through neural implants.",
    thumbnail: "https://image.tmdb.org/t/p/w500/neural-network-poster.jpg",
    backdropImage: "https://image.tmdb.org/t/p/original/neural-network-backdrop.jpg",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    trailerUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    duration: 45,
    category: "Sci-Fi",
    genre: ["Sci-Fi", "Thriller", "Cyberpunk"],
    tags: ["AI", "hacking", "cyberpunk", "neural implants"],
    rating: "R",
    imdbRating: 9.1,
    tmdbRating: 8.9,
    releaseYear: 2024,
    releaseDate: new Date("2024-09-01"),
    director: ["Sam Esmail"],
    cast: ["Rami Malek", "Christian Slater", "Carly Chaikin", "Portia Doubleday"],
    country: ["USA"],
    spokenLanguages: ["English"],
    isPremium: true,
    isFeatured: true,
    isOriginal: true,
    quality: "4K",
    subtitles: ["English", "Spanish", "German", "Japanese"],
    audioTracks: ["English Dolby Atmos"],
    seasons: 3,
    episodes: 30,
    type: "tv-show"
  },

  // Documentaries
  {
    title: "Planet Earth: Future",
    description: "An stunning documentary series exploring how climate change is reshaping our planet and the innovative solutions being developed to preserve Earth's ecosystems.",
    thumbnail: "https://image.tmdb.org/t/p/w500/planet-earth-future-poster.jpg",
    backdropImage: "https://image.tmdb.org/t/p/original/planet-earth-future-backdrop.jpg",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    trailerUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    duration: 60,
    category: "Documentary",
    genre: ["Documentary", "Nature"],
    tags: ["nature", "climate change", "environment", "wildlife"],
    rating: "G",
    imdbRating: 9.3,
    tmdbRating: 9.1,
    releaseYear: 2024,
    releaseDate: new Date("2024-04-22"),
    director: ["David Attenborough"],
    cast: ["David Attenborough"],
    country: ["UK", "USA"],
    spokenLanguages: ["English"],
    isPremium: false,
    isFeatured: true,
    isOriginal: false,
    quality: "8K",
    subtitles: ["English", "Spanish", "French", "German", "Mandarin", "Japanese"],
    audioTracks: ["English Dolby Atmos", "English 5.1"],
    seasons: 1,
    episodes: 8,
    type: "documentary"
  },

  // Animation
  {
    title: "Cosmic Guardians",
    description: "An animated adventure following a group of young space explorers who must protect the galaxy from an ancient evil that threatens to destroy all life.",
    thumbnail: "https://image.tmdb.org/t/p/w500/cosmic-guardians-poster.jpg",
    backdropImage: "https://image.tmdb.org/t/p/original/cosmic-guardians-backdrop.jpg",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    trailerUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    duration: 98,
    category: "Animation",
    genre: ["Animation", "Adventure", "Family"],
    tags: ["space", "adventure", "family", "guardians"],
    rating: "PG",
    imdbRating: 8.0,
    tmdbRating: 7.8,
    releaseYear: 2024,
    releaseDate: new Date("2024-07-04"),
    director: ["Pete Docter", "Brad Bird"],
    cast: ["Chris Pratt", "Zoe Saldana", "Bradley Cooper", "Vin Diesel"],
    country: ["USA"],
    spokenLanguages: ["English"],
    isPremium: false,
    isFeatured: false,
    isOriginal: true,
    quality: "4K",
    subtitles: ["English", "Spanish", "French"],
    audioTracks: ["English Dolby Atmos"],
    type: "movie"
  },

  // Romance
  {
    title: "Love in Digital Times",
    description: "A modern romantic comedy about two programmers who fall in love through code comments before ever meeting in person, exploring love in the digital age.",
    thumbnail: "https://image.tmdb.org/t/p/w500/love-digital-times-poster.jpg",
    backdropImage: "https://image.tmdb.org/t/p/original/love-digital-times-backdrop.jpg",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    trailerUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",
    duration: 112,
    category: "Romance",
    genre: ["Romance", "Comedy"],
    tags: ["programming", "modern love", "technology", "digital"],
    rating: "PG-13",
    imdbRating: 7.6,
    tmdbRating: 7.4,
    releaseYear: 2024,
    releaseDate: new Date("2024-02-14"),
    director: ["Nancy Meyers"],
    cast: ["Emma Stone", "Ryan Gosling", "Dev Patel", "Zendaya"],
    country: ["USA"],
    spokenLanguages: ["English"],
    isPremium: false,
    isFeatured: false,
    isOriginal: true,
    quality: "1080p",
    subtitles: ["English", "Spanish"],
    audioTracks: ["English 5.1"],
    type: "movie"
  }
];

async function seedMovieDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // Find or create a default user for uploading content
    let defaultUser = await User.findOne({ email: 'admin@nexflare.com' });
    
    if (!defaultUser) {
      defaultUser = new User({
        name: 'NexFlare Admin',
        email: 'admin@nexflare.com',
        password: 'admin123', // This should be hashed in production
      });
      await defaultUser.save();
      console.log('Created default admin user');
    }

    // Clear existing videos
    await Video.deleteMany({});
    console.log('Cleared existing videos');

    // Add uploadedBy field to each movie
    const moviesWithUploader = movieDatabase.map(movie => ({
      ...movie,
      uploadedBy: defaultUser._id
    }));

    // Insert the movie database
    const insertedMovies = await Video.insertMany(moviesWithUploader);
    console.log(`Successfully inserted ${insertedMovies.length} movies`);

    // Display summary
    const stats = await Video.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgRating: { $avg: '$imdbRating' }
        }
      }
    ]);

    console.log('\n=== Movie Database Summary ===');
    stats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} movies (Avg Rating: ${stat.avgRating?.toFixed(1)})`);
    });

    const featuredCount = await Video.countDocuments({ isFeatured: true });
    const premiumCount = await Video.countDocuments({ isPremium: true });
    const originalCount = await Video.countDocuments({ isOriginal: true });

    console.log(`\nSpecial Categories:`);
    console.log(`Featured: ${featuredCount} movies`);
    console.log(`Premium: ${premiumCount} movies`);
    console.log(`NexFlare Originals: ${originalCount} movies`);

    console.log('\n✅ Movie database seeded successfully!');
    console.log('🎬 Your NexFlare application now has a comprehensive Netflix-like movie catalog!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the seeder
if (require.main === module) {
  seedMovieDatabase();
}

export default seedMovieDatabase;
