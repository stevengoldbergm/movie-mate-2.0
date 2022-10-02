// ----------- Generate Review History ----------- //

// Pull the logged-in user's email address from handlebars shenanigans
const emailParser = document.querySelector("#email-parse");
const email = emailParser.getAttribute("email");
console.log(email);

// Use Axios to fetch all user reviews that match the current user's ID
const getReviews = async () => {
    // Find the user ID
    try {
        const userData = await axios.get(`api/users/email/${email}`);
        const { username, id } = userData.data;
        console.log(id);
        console.log(username);

        // Add personalized greeting to title banner
        const greetingEl = document.getElementById("greeting");
            greetingEl.innerHTML = `Hi, ${username}!`;

        // Find the reviews by this user
        try {
            const userReviewData = await axios.get(`api/reviews/user/${id}`);

            const userReviews = userReviewData.data;
            console.log(userReviews);

            // For each userReview, create more DOM objects and cry real tears.
            userReviews.forEach(async (review) => {
            // Pull all necessary data
            // Deconstruct review data
            const { movie_id, review_score, review_text } = review;
            console.log(review_score, review_text) // Working
            // Retrieve movie data with title info
            try {
                const movieData = await axios.get(`/api/movies/id/${movie_id}`);
                console.log(movieData);
                const { data } = movieData;
                const {movie_name} = data;

                // ----- Begin DOM Generation ----- //

                // Select the parent element
                const tableBodyEl = document.getElementById("table-body");

                // Create the table row
                const tableRowEl = document.createElement("tr");

                // Create the table data
                    // Create spacer
                    const spacerEl = document.createElement("td");
                        spacerEl.style.width = "5%";
                        // i element
                        const imageEl = document.createElement("i");
                            imageEl.classList.add("fa", "fa-bell-o");
                    // Create Title
                    const titleEl = document.createElement("td");
                        titleEl.innerHTML = `${movie_name}`;
                    // Create User Rating
                    const userRatingEl = document.createElement("td");
                    userRatingEl.innerHTML = `${review_score}/10`;

                // Create Edit button
                const editButtonEl = document.createElement("td");
                    editButtonEl.classList.add("level-right");
                    // a element
                    const buttonEl = document.createElement("a");
                        buttonEl.classList.add("button", "is-small", "is-info");
                        buttonEl.innerHTML = "Edit Review"

                // Append items
                editButtonEl.append(buttonEl);
                spacerEl.append(imageEl);
                tableRowEl.append(spacerEl, titleEl, userRatingEl, editButtonEl);
                tableBodyEl.append(tableRowEl);
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
    
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        };
    }; 
};

getReviews();


// ---------- Edit Button Modal Controller ---------- //

document.getElementById
