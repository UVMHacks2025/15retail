const express = require('express');
const path = require('path');
const app = express();

// Serve static files like images, CSS, and JS
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS for HTML templating
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/donations', (req, res) => {
    res.render('donations');
});

app.get('/trades', (req, res) => {
    res.render('trades');
});

app.get('/buy', (req, res) => {
    res.render('buy');
});

app.get('/sell', (req, res) => {
    res.render('sell');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
