const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://jaylimousa:SBzVXE4LHqj16GEm@cluster0.1puycpp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));


// Define routes
app.get('/', (req, res) => {
  res.send("Hello from Express with MongoDB!");
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


