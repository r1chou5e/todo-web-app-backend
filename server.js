const app = require('./src/app');
const port = process.env.DEV_APP_PORT || 3056;

const server = app.listen(port, () => {
  console.log(`Todo Web App start with port ${port}`);
});

process.on('SIGINT', () => {
  server.close(() => console.log(`Exit Server!`));
});
