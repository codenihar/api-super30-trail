const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000; // You can change this port

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// **Temporary Mock Storage (In-Memory)**
let items = [
  { id: 1, name: 'Item 1', description: 'This is the first item' },
  { id: 2, name: 'Item 2', description: 'Another item for testing' },
];

// **API Routes**
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Mock Items API is running successfully' });
});

// GET /items - Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET /items/:id - Get a specific item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id); // Convert ID to number
  const item = items.find(item => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// POST /items - Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;

  if (!newItem.name || !newItem.description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }

  // Simple ID generation (for mock purposes - in real app use UUIDs or database IDs)
  const nextId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  newItem.id = nextId;

  items.push(newItem);
  res.status(201).json(newItem); // 201 Created status code
});

// PUT /items/:id - Update an existing item by ID
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const itemIndex = items.findIndex(item => item.id === itemId);

  if (itemIndex !== -1) {
    // Keep the ID from the URL, but update other properties from the request body
    items[itemIndex] = { ...items[itemIndex], ...updatedItem, id: itemId };
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE /items/:id - Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const initialLength = items.length;

  items = items.filter(item => item.id !== itemId);

  if (items.length < initialLength) {
    res.json({ message: 'Item deleted successfully' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Mock API server listening on port ${PORT}`);
});
