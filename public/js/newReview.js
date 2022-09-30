// const createReview = async (event) => {
//     event.preventDefault();
//     // Pull imdbId from URL
//     const url = window.location.pathname;
//     const id = url.substring(url.lastIndexOf('/') + 1);
//     console.log(id)
//     // Collect values from the login form
//     const reveiw_text = document.querySelector('PLEACEHOLDER FOR REVIEW TEXT').value.trim();
//     const review_score = document.querySelector('PLACEHOLDER FOR REVIEW SCOR').value.trim();
    
//     if (reveiw_text && review_score) {
//       // Send a POST request to the API endpoint
//       const response = await axios.get('http://localhost:3001/api/movies',{
//         params: {
//             imdb_id: id
//         }
//       });
//       console.log(response)
//       const { data } = response;
//       console.log(data)
//     //   if (response.ok) {
//     //     // If successful, redirect the browser to the profile page
//     //     document.location.replace('/profile');
//     //     console.log('api response ok')
//     //   } else {
//     //     alert(response.statusText);
//     //   }
//     }
//   };
  
  
  
//   document
//     .querySelector('PLACEHOLDER FOR REVIEW BUTTON ID')
//     .addEventListener('submit', createReview);
  