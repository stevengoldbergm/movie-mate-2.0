
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

const createReview = async (event) => {
    event.preventDefault();
    // Pull imdbId from URL
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id)
    // Collect values from the login form
    // const reveiw_text = document.querySelector('PLEACEHOLDER FOR REVIEW TEXT').value.trim();
    // const review_score = document.querySelector('PLACEHOLDER FOR REVIEW SCOR').value.trim();
    
    // if (reveiw_text && review_score) {
        if(true) {
      // Send a GET request to see if the movie is in our DB
      const response = await axios.get('/api/movies/'+ id,{
        params: {
            imdb_id: id
        }
      });
      console.log(response)
      const { data } = response;
    //   console.log(data[0].id)
      let movie_id =data.id
      console.log(movie_id)
      
      let review_score = "6.8"
      let review_text = "Best Christmas Movie around"
      const newMovie = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({ movie_id, review_score, review_text }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(newMovie)
      console.log('review created')
    }
  };
// init();
document
    .querySelector('#add-review')
    .addEventListener('click', createReview);