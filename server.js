import express from 'express';
import router from './routes/index.js';
import { initDb } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;
export const version = '0.0.1';

app.use(express.json());

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Routes
app.use('/', router);

// Initialize the database
initDb((error) => {
  if (error) {
    console.error('Failed to initialize database:', error);
  } else {
    console.log('Database initialized successfully');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} - Version: ${version}`);
});
