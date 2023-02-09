const express =require('express');
require('dotenv').config();
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.API_KEY)
const cors= require('cors');
//init express
const app = express();
// Port
const port =  process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cors());
//create a route
app.get('/api/v1/all', (req, res) => {
    res.send('Hello World!');
});
//all top rated movies
app.get('/api/v1/top-rated', async(req, res) => {
    console.log(req.params.id);
    await moviedb.movieTopRated()
    .then(async(response) => {
        res.send(response.results);
    }).catch((error) => {
        console.log(error);
    })
    });
    //all now playing movies
app.get('/api/v1/now', async(req, res) => {
    console.log(req.params.id);
    await moviedb.movieNowPlaying()
    .then(async(response) => {
        console.log(response.results);
        res.send(response.results);
    }).catch((error) => {
        console.log(error);
    })
    });
    //all most popular movies
app.get('/api/v1/popular', async(req, res) => {
    console.log(req.params.id);
    await moviedb.moviePopular()
    .then(async(response) => {
        res.send(response.results);
    }).catch((error) => {
        console.log(error);
    })
    });
//search for a movies
app.get('/api/v1/search/:query', async (req, res) => {
    console.log(req.params.query);
    await moviedb.searchMovie({ query: req.params.query })
    .then(async(response) => {
        const { results } = await response;
        console.log(results);
        res.send(results);
    })
    .catch(error => {
        res.send(error);
    })
}
);
//search a person
app.get('/api/v1/person/:query', (req, res) => {
    moviedb.searchPerson({ query: req.params.query })
    .then(async(response) => {
        const { results } = await response;
        res.send(results);
    }).catch((error) => {
        console.log(error);
    })
    });
//search with movie keyword
app.get('/api/v1/keyword/:query', (req, res) => {
    moviedb.searchKeyword({ query: req.params.query })
    .then(response => {
        res.send(response);
    }).catch((error) => {
        console.log(error);
    })
});
if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + "/dist/"));
    app.get("*", (req, res) => {
      res.sendFile(__dirname + "/dist/index.html");
    });
  }
//listen on port 3000
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
}
);