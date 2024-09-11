require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/index'); 
const propertyRoutes = require('./Routes/PropertyRoutes');  
const tenantRoutes = require('./Routes/TenantRoutes');
const rentalPaymentRoutes = require('./Routes/rentalPaymentRoutes');
const authRoutes = require('./Routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,  
}));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/payment', rentalPaymentRoutes);
app.use('/tenant', tenantRoutes);
app.use('/property', propertyRoutes);

app.get('/', (req, res) => {
  res.send('Property Management API is running');
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful :)');
    await sequelize.sync();
    console.log('Database synchronized');
    console.log(`Server is running on ${port} :)`);
  } catch (error) {
    console.error('Error initializing database or starting server:', error);
  }
});
