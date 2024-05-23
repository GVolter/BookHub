const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');
const authRoutes = require('./routes/authRoutes');
const authorRoutes = require('./routes/authorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/authors', authorRoutes);
app.use('/categories', categoryRoutes);
app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Welcome');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
