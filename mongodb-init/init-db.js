// =====================================================================
// 🎬 MongoDB Initialization Script for NexFlare Streaming Platform
// =====================================================================
// This script runs when the MongoDB container starts for the first time
// It creates collections, indexes, and populates sample data for development
// =====================================================================

print('');
print('='.repeat(60));
print('🎬 INITIALIZING NEXFLARE DATABASE');
print('='.repeat(60));
print('');

// Switch to nexflare database
db = db.getSiblingDB('nexflare');
print('📁 Connected to database: nexflare');
print('');

// =====================================================================
// 📝 CREATING COLLECTIONS WITH VALIDATION SCHEMAS
// =====================================================================

print('📝 Creating collections with validation schemas...');
print('');

// ---------------------------------------------------------------------
// � USERS COLLECTION
// ---------------------------------------------------------------------
print('  → Creating users collection...');
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'password', 'name'],
      properties: {
        email: {
          bsonType: 'string',
          description: 'Email is required and must be a string'
        },
        password: {
          bsonType: 'string',
          description: 'Password is required and must be a string'
        },
        name: {
          bsonType: 'string',
          description: 'Name is required and must be a string'
        },
        role: {
          bsonType: 'string',
          enum: ['user', 'admin'],
          description: 'Role must be either user or admin'
        },
        subscription: {
          bsonType: 'string',
          enum: ['free', 'premium'],
          description: 'Subscription must be either free or premium'
        }
      }
    }
  }
});
print('  ✅ Users collection created successfully');
print('');

// ---------------------------------------------------------------------
// 🎥 VIDEOS COLLECTION
// ---------------------------------------------------------------------
print('  → Creating videos collection...');
db.createCollection('videos', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'description', 'videoUrl'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'Title is required and must be a string'
        },
        description: {
          bsonType: 'string',
          description: 'Description is required and must be a string'
        },
        videoUrl: {
          bsonType: 'string',
          description: 'Video URL is required and must be a string'
        },
        duration: {
          bsonType: 'number',
          minimum: 0,
          description: 'Duration must be a positive number'
        },
        rating: {
          bsonType: 'string',
          description: 'Rating must be a string'
        }
      }
    }
  }
});
print('  ✅ Videos collection created successfully');
print('');

// ---------------------------------------------------------------------
// 📺 WATCH HISTORY COLLECTION
// ---------------------------------------------------------------------
print('  → Creating watch history collection...');
db.createCollection('watchhistories');
print('  ✅ Watch history collection created successfully');
print('');

// =====================================================================
// 🔍 CREATING INDEXES FOR OPTIMIZED PERFORMANCE
// =====================================================================

print('🔍 Creating database indexes for optimal performance...');
print('');

// ---------------------------------------------------------------------
// � USER INDEXES
// ---------------------------------------------------------------------
print('  → Creating user indexes...');
db.users.createIndex({ email: 1 }, { unique: true });
print('    ✓ Email unique index created');

db.users.createIndex({ createdAt: 1 });
print('    ✓ CreatedAt index created');
print('');

// ---------------------------------------------------------------------
// 🎥 VIDEO INDEXES
// ---------------------------------------------------------------------
print('  → Creating video indexes...');
db.videos.createIndex({ title: 1 });
print('    ✓ Title index created');

db.videos.createIndex({ category: 1 });
print('    ✓ Category index created');

db.videos.createIndex({ tags: 1 });
print('    ✓ Tags index created');

db.videos.createIndex({ createdAt: -1 });
print('    ✓ CreatedAt descending index created');

db.videos.createIndex({ views: -1 });
print('    ✓ Views descending index created');

db.videos.createIndex({ rating: -1 });
print('    ✓ Rating descending index created');
print('');

// ---------------------------------------------------------------------
// 📺 WATCH HISTORY INDEXES
// ---------------------------------------------------------------------
print('  → Creating watch history indexes...');
db.watchhistories.createIndex({ userId: 1, videoId: 1 });
print('    ✓ User-Video compound index created');

db.watchhistories.createIndex({ userId: 1, watchedAt: -1 });
print('    ✓ User-WatchedAt compound index created');
print('');

// =====================================================================
// 🌱 POPULATING SAMPLE DATA FOR DEVELOPMENT
// =====================================================================

print('🌱 Inserting sample data for development environment...');
print('');

// ---------------------------------------------------------------------
// 📊 SAMPLE CATEGORIES AND GENRES
// ---------------------------------------------------------------------
const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Documentary', 'Animation'];
print('  📂 Available genres:', genres.join(', '));
print('');

// ---------------------------------------------------------------------
// 🎬 SAMPLE VIDEOS DATA
// ---------------------------------------------------------------------
print('  → Inserting sample videos...');

db.videos.insertMany([
  {
    title: 'Epic Adventure Trailer',
    description: 'An epic adventure awaits in this thrilling preview',
    thumbnail: 'https://via.placeholder.com/1280x720/FF6B9D/FFFFFF?text=Epic+Adventure',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: 120,
    rating: 'PG-13',
    releaseYear: 2024,
    isPremium: false,
    views: 15420,
    likes: 1205,
    category: 'Action',
    tags: ['adventure', 'action', 'thriller'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  {
    title: 'Comedy Gold Collection',
    description: 'The best comedy moments compiled together',
    thumbnail: 'https://via.placeholder.com/1280x720/9D4EDD/FFFFFF?text=Comedy+Gold',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    duration: 95,
    rating: 'PG',
    releaseYear: 2024,
    isPremium: true,
    views: 8920,
    likes: 892,
    category: 'Comedy',
    tags: ['comedy', 'funny', 'entertainment'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  {
    title: 'Space Documentary',
    description: 'Explore the mysteries of the universe',
    thumbnail: 'https://via.placeholder.com/1280x720/E50914/FFFFFF?text=Space+Doc',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
    duration: 180,
    rating: 'G',
    releaseYear: 2024,
    isPremium: false,
    views: 25100,
    likes: 2156,
    category: 'Documentary',
    tags: ['space', 'science', 'educational'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('  ✅ Sample videos inserted successfully');
print('');

// =====================================================================
// ✅ INITIALIZATION COMPLETION SUMMARY
// =====================================================================

print('='.repeat(60));
print('✅ DATABASE INITIALIZATION COMPLETED SUCCESSFULLY!');
print('='.repeat(60));
print('');
print('📊 Database Statistics:');
print('  • Collections created:', db.getCollectionNames().length);
print('  • Available collections:', db.getCollectionNames().join(', '));
print('  • Sample videos added:', db.videos.countDocuments());
print('');
print('🎬 NexFlare Database is ready for development!');
print('='.repeat(60));
print('');