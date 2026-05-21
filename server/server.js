const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// Routes

const leadRoutes = require('./routes/leadRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);


// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)

.then(() => console.log('MongoDB Connected'))

.catch((err) => console.log(err));


// Test Route

app.get('/', (req, res) => {
  res.send('CRM Backend Running');
});


// Port

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});