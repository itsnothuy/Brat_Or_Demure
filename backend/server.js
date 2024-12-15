const app = require('./app'); // Import the app instance from app.js

// Start the server with a dynamic port
const server = app.listen(0, () => {
  console.log(`Server running on http://localhost:${server.address().port}`);
});

// Handle unexpected errors gracefully
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
  });

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    server.close(() => process.exit(1));
});