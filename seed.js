require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('./models/song');
const Playlist = require('./models/playlist');

const sampleSongs = [
  {
    title: 'Sunny Days',
    artist: 'Acoustic Breeze',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverUrl: 'https://picsum.photos/seed/song1/200/200',
    duration: 372,
  },
  {
    title: 'Midnight Drive',
    artist: 'Synthwave Echo',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverUrl: 'https://picsum.photos/seed/song2/200/200',
    duration: 423,
  },
  {
    title: 'Lofi Chill',
    artist: 'Study Beats',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverUrl: 'https://picsum.photos/seed/song3/200/200',
    duration: 345,
  },
];

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing in .env');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Song.deleteMany();
    await Playlist.deleteMany();

    const createdSongs = await Song.insertMany(sampleSongs);
    console.log(`Inserted ${createdSongs.length} sample songs.`);

    await Playlist.create({
      name: 'Favorites',
      songs: [createdSongs[0]._id, createdSongs[1]._id],
    });
    console.log('Sample playlist created.');

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
};

seedDB();