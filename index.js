const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');

const app = express();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/test', (req, res) => {
  res.send('Hello TESTING JI  from Express!');
});

// For local dev
if (process.env.NODE_ENV !== 'lambda') {
  const PORT = process.env.PORT || 3005;
  app.listen(PORT, () => {
    console.log(`Express server running locally on http://localhost:${PORT}`);
  });
}

// For Lambda
const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};