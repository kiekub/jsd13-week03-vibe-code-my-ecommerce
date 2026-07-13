require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Sleep Routine API' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'API is running', endpoints: ['/api/users', '/api/plans', '/api/hosts', '/api/bookings', '/api/sessions', '/api/reviews'] });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to chrome-sleep-db');

    const userRoutes = require('./routes/users');
    const planRoutes = require('./routes/plans');
    const hostRoutes = require('./routes/hosts');
    const bookingRoutes = require('./routes/bookings');
    const sessionRoutes = require('./routes/sessions');
    const reviewRoutes = require('./routes/reviews');

    app.use('/api/users', userRoutes);
    app.use('/api/plans', planRoutes);
    app.use('/api/hosts', hostRoutes);
    app.use('/api/bookings', bookingRoutes);
    app.use('/api/sessions', sessionRoutes);
    app.use('/api/reviews', reviewRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
