const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('../task-manager-api-Rishik3001/routes/taskroutes');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes
app.use('/tasks', taskRoutes);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found.' });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong.' });
});

// Start the server only if running this file directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app; // Export for testing or modular usage
