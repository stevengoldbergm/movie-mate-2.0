const init = async () => {
    // Pull imdbId from URL
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id); // working
    
    // Move to reviews.js
    try {
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

    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        };
    };
};

// ---------- Search Local Server for data ---------- //

const localData = async (imdbId) => {
    try {
        let movie = await axios.get('/api/movies/' + imdbId);
        let {id, imdb_id, movie_name, reviews} = movie.data;
    
    // Working
        // console.log(movie)
        // console.log(id)
        // console.log(imdb_id)
        // console.log(movie_name);
        // console.log(reviews);

    // Get the user name from the user ID
    reviews.forEach( async (review) => {
        const { id, movie_id, review_score, review_text, user_id } = review;

        // Working
            // console.log(id);
            // console.log(movie_id);
            // console.log(review_score);
            // console.log(review_text);
            // console.log(user_id);

        try {
            const userData = await axios.get('/api/users/' + user_id);

            console.log(userData); // Working
            const { data } = userData;
            const { username } = data;
            console.log(username); // Working

            // ---------- DOM Element Generation ---------- //
            // Create card base
            const eventsCardEl = document.createElement("div");
                eventsCardEl.classList.add("card", "events-card");

            // Header has two Paragraph tags
            const cardHeaderEl = document.createElement("header")
                cardHeaderEl.classList.add("card-header", "is-flex", "is-justify-content-space-between");
            const userNameEl = document.createElement("p");
                userNameEl.classList.add("card-header-title");
                userNameEl.innerHTML = `${username} says. . .`;
            const userRatingEl = document.createElement("p");
                userRatingEl.classList.add("pt-3", "pr-3", "has-text-weight-bold", "has-text-right");   
                userRatingEl.innerHTML = `${review_score} out of 10`;
            
                // Append the header elements
                cardHeaderEl.append(userNameEl, userRatingEl);

            // Card Table has content box, table, table body, and table row
            const cardTableEl = document.createElement("div");
                cardTableEl.classList.add("card-table");
            const contentEl = document.createElement("div");
                contentEl.classList.add("content", "p-2");
            const tableEl = document.createElement("table");
                tableEl.classList.add("table", "is-fullwidth");
            
            // Table row has two table data elements
            const tableRowEl = document.createElement("tr");
            
            // Spacer element has an i element
            const spacerEl = document.createElement("td");
            const imgEl = document.createElement("i");
                imgEl.classList.add("fa", "fa-bell-o");
                spacerEl.style.width = "5%";
                // Append image to spacer
                spacerEl.append(imgEl);
            const textEl = document.createElement("td");
            textEl.innerHTML = review_text;
    
            // Append the spacer/text to the table row
            tableRowEl.append(spacerEl, textEl);

            // Append the row to the table
            tableEl.append(tableRowEl);

            // Append the table to the content
            contentEl.append(tableEl);

            // Append the content to the table base
            cardTableEl.append(contentEl);

            // Append everything to the card base
            eventsCardEl.append(cardHeaderEl, cardTableEl, );
            
            // Select the element to append all child elements
            const cardMaster = document.querySelector(".card-master");

            // Create line break element
            const breakEl = document.createElement("br");

            // Append the card base to the Parent element
            cardMaster.append(eventsCardEl, breakEl);

            // You have to check these all again, and make sure that the data is in the elements.

        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            };
        };

        
        

    });
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        };
    };
    
    
}

// ---------- Search OMDB for data ---------- //

const omdbData = async (searchValue) => {
    // OMDB Key Variables
    const omdbSearch = 'https://www.omdbapi.com/?i='
    const omdbApiKey = '&apikey=c26a6eef'
    const omdbPlot = '&plot=full'
    const searchResult = omdbSearch + searchValue + omdbPlot + omdbApiKey

    try {
        movieData = await axios.get(searchResult);
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        };
    };

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