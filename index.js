const express = require('express');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes.js');
const companyRoutes = require('./routes/companyRoutes');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 8000;

dbConnect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/company', companyRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:8000/`);
});