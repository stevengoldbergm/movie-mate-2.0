const init = async () => {
    // Pull imdbId from URL
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id); // working
    
    // Move to reviews.js
    const response = await axios.get('/api/movies/tt0095016');
    console.log(response);
    const { data } = response;
    console.log(data)
    const { reviews } = data;
    console.log(reviews);

    // Pull OMDB data
    const { Title, Rated, Poster, Actors, Director, Released, Genre, Writer } = await omdbData(id);
    console.log(Title);
    console.log(Rated);
    console.log(Poster);
    console.log(Actors);
    console.log(Director);
    console.log(Released);
    console.log(Genre);
    console.log(Writer);

    // Add data points to page
    const posterEl = document.querySelector(".movie-poster");
        posterEl.src = Poster;
    const titleEl = document.querySelector(".movie-title");
        titleEl.innerHTML = Title + " Reviews";
    const actorsEl = document.querySelector(".movie-actors");
        actorsEl.innerHTML = "Actors  |   " + Actors;
    const directorEl = document.querySelector(".movie-director");
        directorEl.innerHTML = "Directed By  |   " + Director;
    const ratedEl = document.querySelector(".movie-rated");
        ratedEl.innerHTML = "Rated  |   " + Rated;
    const releasedEl = document.querySelector(".movie-released");
        releasedEl.innerHTML = "Released  |   " + Released;
    const genreEl = document.querySelector(".movie-genre");
        genreEl.innerHTML = "Genre  |   " + Genre;
    const writerEl = document.querySelector(".movie-writer");
        writerEl.innerHTML = "Writers  |   " + Writer;

    // Pull Review Data
    localData(id)



};

// ---------- Search Local Server for data ---------- //

const localData = async (imdbId) => {
    
    let movie = await axios.get('/api/movies/' + imdbId);
    let {id, imdb_id, movie_name, reviews} = movie.data;
    
    console.log(movie)
    console.log(id)
    console.log(imdb_id)
    console.log(movie_name);
    console.log(reviews);

    // Get the user name from the user ID
    reviews.forEach( async (review) => {
        const {id, movie_id, review_score, review_text, user_id} = review;
        console.log(id);
        console.log(movie_id);
        console.log(review_score);
        console.log(review_text);
        console.log(user_id);

        const userData = await axios.get('/api/users/' + user_id);
        console.log(userData);
        

    });
}


// ---------- Search OMDB for data ---------- //

const omdbData = async (searchValue) => {
    // OMDB Key Variables
    const omdbSearch = 'https://www.omdbapi.com/?i='
    const omdbApiKey = '&apikey=c26a6eef'
    const omdbPlot = '&plot=full'
    const searchResult = omdbSearch + searchValue + omdbPlot + omdbApiKey

    movieData = await axios.get(searchResult)
    movieData = movieData.data;
    // console.log(movieData) // Working

    // Pull Rotten Tomatoes from movieData.Ratings
    rtScore = movieData.Ratings[1]
    if (rtScore) {
        rtScore = JSON.stringify(rtScore.Value)
        rtScore = rtScore.substring(1, 4)
    } else {
        rtScore = "N/A"
    }

    return movieData;
}


init();