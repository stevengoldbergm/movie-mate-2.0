// ----------- Search Controller ----------- //

// Activate Search Form
document.querySelector("#srch-form").addEventListener('submit', mainSearch);

// Search Form Function
async function mainSearch(event) {
  // Stop refresh 
  event.preventDefault();

  // Pull the search data from OMDB
  const searchData = await searchOMDB();
  console.log(searchData);
  postSearchResults(searchData);

}

// ---------- Search History Dropdown ---------- //

// Add event listeners to drop-down
let dropDownMenuContent = document.querySelector('.dropdown-content')
dropDownMenuContent.addEventListener("click", fillSearch);

// Generate Search History on start-up
function fillHistory() {
  let keys = Object.keys(localStorage);
  // console.log(keys); // Working

  for (i = 0; i < keys.length; i++) {
    // Make a new a object
    var newLink = document.createElement("a");
    newLink.classList.add("dropdown-item");
    newLink.textContent = keys[i].substring(11);
    // console.log(newLink.textContent); // Working
    // console.log(newLink); // Working
    // console.log(dropDownMenuContent); // Working
    dropDownMenuContent.prepend(newLink);
  } 
}


// Use search history buttons to enter search value, then pull movie data
async function fillSearch (event) {
  // Don't add "Clear History" to search bar on click!
  if(!event.target.textContent || (event.target.textContent.trim() == "Clear History")) {
      return;
  }

  // console.log(event) // Working
  // console.log(event.target) // Working
  // console.log(event.target.textContent) // Working

  if (!event.target.value) {
      searchEl.value = event.target.textContent;
  } 
  const searchData = await searchOMDB();
  // console.log(searchData); // Working

  // Generate results in view
  postSearchResults(searchData);

}

// Post search results
function postSearchResults(searchData) {
  // Generate results on screen

  // Select Elements
  const resultTableEl = document.querySelector('#search-results')
  const table = document.querySelector('#table-body');
  
  // Remove all child elements if they exist
  removeChildren(table);

  // Reveal results table
  resultTableEl.classList.remove('is-hidden');

  // Build out search results with DOM
  searchData.forEach((movie) => {
    console.log('Building Results:')

    // console.log(movie) // working
    const {Title, Year, imdbID} = movie;
    // console.log(Title, Year, imdbID); // Working

    // Create row element
    const rowEl = document.createElement('tr');
    console.log(rowEl);

    // create spacer element
    const spacerEl = document.createElement('td');
        spacerEl.style.width = "5%";
    const spacerImage = document.createElement('i');
        spacerImage.classList.add('fa', 'fa-bell-o');

    spacerEl.append(spacerImage);

    // Create Title element
    const titleEl = document.createElement('td');
        titleEl.innerHTML = Title;

    // Create Year element
    const yearEl = document.createElement('td');
        yearEl.innerHTML = `Released: ${Year}` 

    // Create redirect button
    const buttonBoxEl = document.createElement('td');
        buttonBoxEl.classList.add('level-right');
    const buttonEl = document.createElement('a');
        buttonEl.classList.add('button', 'is-small', 'is-info');
        buttonEl.setAttribute('imdb-id', imdbID);
        buttonEl.innerHTML = 'Movie Details';
        buttonEl.setAttribute('href', `/movie-details/${imdbID}`)
        
    // Append button to button box
    buttonBoxEl.append(buttonEl);
    
    // Append row to table
    rowEl.append(spacerEl, titleEl, yearEl, buttonBoxEl);
    table.append(rowEl);
  })
}

// Function to remove child elements
function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Function to clear local storage/search history
function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}

// ---------- OMDB API ---------- //

// OMDB Key Variables
const omdbSearch = 'https://www.omdbapi.com/?s=' // change t to s if you want a list of similar movie names
const omdbApiKey = '&apikey=c26a6eef'
const omdbType = '&type=movie'

// Define the movie searchbar object
const searchEl = document.querySelector("#srch-title");

// Search OMDB using search bar value
async function searchOMDB() {
  // Set up the search parameters
  const searchValue = searchEl.value;
  const searchResult = omdbSearch + searchValue + omdbType + omdbApiKey

  // Start search
  const response = await axios.get(searchResult)
  // console.log(response.data.Search); // Working
  
  // Fetch Syntax
    // const responseFetch = await fetch(searchResult);
    // const data = await responseFetch.json();
    // console.log(data.Search) // Working
  

  // Add History Button for search history

  // Define Variables
  var movieSave = searchEl.value
  console.log("Movie save name: " + movieSave)
  console.log("Storage Test: ", localStorage.getItem("MovieMate: " + movieSave), movieSave)

  // Don't add history button if local storage already exists
  if (!localStorage.getItem("MovieMate: " + movieSave)) {
    // If no local storage, then:
    localStorage.setItem("MovieMate: " + movieSave, movieSave)
    console.log(localStorage.getItem("MovieMate: " + movieSave))  

    var newLink = document.createElement("a");

    newLink.classList.add("dropdown-item");
    newLink.textContent = searchEl.value;
    console.log(newLink.textContent)
    console.log(newLink)
    console.log(dropDownMenuContent)

    dropDownMenuContent.prepend(newLink);
    }

  // Return list of movie objects based on search parameters
  return response.data.Search;
  // return data.Search; // Fetch return
}

// ---------- Initialize the App ---------- //
function init() {
  fillHistory();
}

init();

