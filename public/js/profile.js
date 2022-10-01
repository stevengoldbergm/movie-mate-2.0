// ----------- Generate Review History ----------- //

// Pull the logged-in user's email address from handlebars shenanigans
const emailParser = document.querySelector("#email-parse");
const email = emailParser.getAttribute("email");
console.log(email);

// Use Axios to fetch all user reviews that match the current user's ID
const getUserId = async () => {
    const userData = await axios.get(`api/users/email/${email}`);
    const { username, id } = userData.data;
    console.log(id);
    console.log(username);

    const userReviews = await axios.get(`api/reviews/user/${id}`)
    const { data } = userReviews;
    console.log(data);
}

getUserId();



// Use Axios to fetch the SUM(review) of this user
    // This probably needs a literal call in the back-end

// Use DOM to create the objects under Your Reviews, utilizing
 // Movie Title
 // Review Score
 // Review Substring? (10 letters + ...)

