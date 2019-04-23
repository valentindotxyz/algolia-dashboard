const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const Movie = require('./models/Movie');

app.get('/api/1/movies/:id', function (req, res) {
    Movie
        .findById(req.params.id)
        .then(movie => res.json(movie));
});

app.post('/api/1/movies', function (req, res) {
    res.send('Got a POST request')
});

app.post('/api/1/movies/:id', function (req, res) {
    res.send('Got a POST request')
});

app.delete('/api/1/movies/:id', function (req, res) {
    res.send('Got a POST request')
});

app.get('/ping', (req, res) => res.json('pong'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(process.env.PORT || 8080, () => console.log('[API] API started.'));