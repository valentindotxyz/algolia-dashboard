const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

const Movie = require('./models/Movie');

// Get a movie details…
app.get('/api/1/movies/:id', function (req, res) {
    Movie
        .findById(req.params.id)
        .then(movie => res.json(movie))
        .catch(err => {
            if (err.code === 'NOT_FOUND') {
                res.status(404).json({ status: 'error', error: 'not_found' });
            }

            res.status(500).json({ status: 'error', error: null });
        })
});

// Update partially a movie…
app.post('/api/1/movies', function (req, res) {
    res.json(req.body);
});

// Delete a movie…
app.delete('/api/1/movies/:id', function (req, res) {
    res.send('Got a POST request')
});

// Check if the API is up and running…
app.get('/ping', (req, res) => res.json('pong'));

// Serve the Front-End app…
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

// Listen either on Heroku provided port or 8080…
app.listen(process.env.PORT || 8080, () => console.log('[API] API started.'));