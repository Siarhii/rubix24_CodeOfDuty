// app.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Sample data
const services = {
  restaurants: [
    { id: 1, name: 'Local Eatery', rating: 4.5, safetyRating: 9 },
    { id: 2, name: 'Cuisine Delight', rating: 4.2, safetyRating: 8 },
  ],
  transportation: [
    { id: 1, name: 'City Cabs', rating: 4.8, safetyRating: 9.5 },
    { id: 2, name: 'Metro Shuttle', rating: 4.5, safetyRating: 8.5 },
  ],
  accommodations: [
    { id: 1, name: 'Comfort Suites', rating: 4.7, safetyRating: 9.2 },
    { id: 2, name: 'River View Inn', rating: 4.4, safetyRating: 8.8 },
  ],
  attractions: [
    { id: 1, name: 'City Museum', rating: 4.6, safetyRating: 9.3 },
    { id: 2, name: 'Historic Landmark', rating: 4.3, safetyRating: 8.7 },
  ],
};

// Get all services
app.get('/services', (req, res) => {
  res.json(services);
});

// Get services by category
app.get('/services/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  if (services[category]) {
    res.json(services[category]);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

// Get service by category and ID
app.get('/services/:category/:id', (req, res) => {
  const category = req.params.category.toLowerCase();
  const id = parseInt(req.params.id);
  const service = services[category] ? services[category].find(s => s.id === id) : null;

  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
