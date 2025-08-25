const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/analysis', require('./routes/analysis.routes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
