const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Enable JSON parsing
app.use(express.json());

// Database connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'portfolio',
  port: parseInt(process.env.DB_PORT || '5432'),
  // Wait up to 5 seconds to establish a connection
  connectionTimeoutMillis: 5000,
});

// Logging Middleware
app.use((req, res, next) => {
  console.log(`[Node.js API] ${req.method} ${req.path}`);
  next();
});

// API health endpoint (checks database connectivity)
app.get('/api/node/health', async (req, res) => {
  let dbConnected = false;
  let dbTime = null;

  try {
    const client = await pool.connect();
    const dbRes = await client.query('SELECT NOW()');
    dbTime = dbRes.rows[0].now;
    dbConnected = true;
    client.release();
  } catch (err) {
    console.error('Database connection error in health check:', err.message);
  }

  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    version: '1.0.0',
    database: dbConnected,
    timestamp: dbTime,
  });
});

// Contact form submission endpoint
app.post('/api/node/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  try {
    const query = 'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, message];
    
    const dbRes = await pool.query(query, values);
    res.status(201).json({
      success: true,
      message: 'Contact form entry saved to Database!',
      data: dbRes.rows[0],
    });
  } catch (err) {
    console.error('Error saving contact entry:', err.message);
    res.status(500).json({ error: 'Internal Server Error saving contact entry.' });
  }
});

// Get all contacts (demo endpoint)
app.get('/api/node/contacts', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(dbRes.rows);
  } catch (err) {
    console.error('Error fetching contact list:', err.message);
    res.status(500).json({ error: 'Internal Server Error fetching contacts.' });
  }
});

// Wildcard fallback
app.use('/api/node/*', (req, res) => {
  res.status(404).json({ error: 'Node API Route not found' });
});

// Start Express Server
app.listen(port, () => {
  console.log(`Node.js API Server is running on port ${port}`);
});
