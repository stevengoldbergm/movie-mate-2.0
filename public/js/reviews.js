
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
};

// Get Review info from user inputs, check database for movie, if found create review linked by movie id, if error create new movie with IMDB ID and name then check database for movie id and create review linked by movie id
const createReview = async (event) => {
    event.preventDefault();
    // Pull imdbId from URL
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id)
    // Collect values from the login form
    // const reveiw_text = document.querySelector('#review-text').value.trim();
    // const review_score = document.querySelector('#review-score').value.trim();
    
    // if (reveiw_text && review_score) { uncomment when text and score come from page
        if(true) {
            try{
      // Send a GET request to see if the movie is in our DB
      const response = await axios.get('/api/movies/'+ id,{
        params: {
            imdb_id: id
        }
      });
        const { data } = response;
        const movie_id =data.id
        // lets to be rmoved when review score and text const are defined in browser
        let review_score = "6.8"
        let review_text = "Best Christmas Movie around"
        // Create review linked to movie and user from session
        const newReview = await fetch('/api/reviews', {
          method: 'POST',
          body: JSON.stringify({ movie_id, review_score, review_text }),
          headers: { 'Content-Type': 'application/json' },
        });
    } catch { 
        // let to be removed once movie name is defiend through imdb data on page
        const movie_name = 'Title'
        // Create new movie if movie doesn't exist
        const newMovie = await fetch('http://localhost:3001/api/movies',{
            method: 'POST',
            body: JSON.stringify({ movie_name, 'imdb_id':id }),
            headers: { 'Content-Type': 'application/json' },
        });

        // Once movie is dynamically created get new id from database
        const response = await axios.get('/api/movies/'+ id,{
            params: {
                imdb_id: id
            }
          });
            const { data } = response;
        //   console.log(data[0].id)
            const movie_id =data.id
        // let to be removed once movie name is defiend through imdb data on page
            let review_score = "6.8"
            let review_text = "Best Christmas Movie around"
      const newReview = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({ movie_id, review_score, review_text }),
        headers: { 'Content-Type': 'application/json' },
      });
    //   console.log(newReview)
    }
}};
// init();
// document
//     .querySelector('#add-review')
//     .addEventListener('click', createReview);
    document
    .querySelector('#submit-review')
    .addEventListener('click', createReview);