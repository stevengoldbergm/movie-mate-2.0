// --------- Render Reviews --------- //
const renderReview = async () => {
  // Pull imdbId
    const url = window.location.pathname
    const id = url.substring(url.lastIndexOf('/') + 1);
    // console.log(id); // working

    // Move to reviews.js
    const response = await axios.get('/api/movies/tt0095016');
    console.log(response);
    const { data } = response;
    console.log(data)
    const { reviews } = data;
    console.log(reviews);

    // Send user to review page
    location.replace('/reviews/' + id);
  };
  
  document.querySelector('#review').addEventListener('click', renderReview);