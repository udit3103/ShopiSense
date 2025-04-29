const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// API Routes
app.get('/api/products', (req, res) => {
    const products = [
        {
            id: 1,
            name: "Smart Watch Pro",
            price: 299.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
            description: "Advanced smartwatch with health monitoring",
            category: "Electronics",
            rating: 4.8,
            reviews: 125
        },
        {
            id: 2,
            name: "Wireless Earbuds",
            price: 149.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
            description: "Premium wireless earbuds with noise cancellation",
            category: "Audio",
            rating: 4.6,
            reviews: 89
        },
        {
            id: 3,
            name: "Gaming Laptop",
            price: 1299.99,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
            description: "High-performance gaming laptop",
            category: "Computers",
            rating: 4.9,
            reviews: 45
        }
    ];
    res.json(products);
});

// Handle all other routes by serving the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 