// ----------- Modal Controller ----------- //

// Add modal functionality 
  // Make into a new page later
  document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });
  
  // Activate the modal
  document.querySelector("#srch-form").addEventListener('submit', modalSearch);
  
  async function modalSearch(event) {
    // Stop refresh 
    event.preventDefault();
  
    // Pull the search data from OMDB
    const searchData = await searchOMDB();
    console.log(searchData)
  
    // Turn the search data from OMDB into an array
  
    // Refresh page with the modal set to "is-active" 
    
    // Populate modal with links using the array data
    document.querySelector(".modal").classList.add('is-active');
  }

// ---------- Search History Dropdown ---------- //

// Add event listeners to drop-down
let dropDownMenuContent = document.querySelector('.dropdown-content')
dropDownMenuContent.addEventListener("click", fillSearch);

// Generate Search History on start-up
function fillHistory() {
  let keys = Object.keys(localStorage);
//   console.log(keys); // Working

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
  if(!event.target.textContent || (event.target.textContent.trim() == "Clear History")) {
      return;
  }

  // console.log(event) // Working
  // console.log(event.target) // Working
  // console.log(event.target.textContent) // Working

  searchEl.value = event.target.textContent;
  const searchData = await searchOMDB();
  console.log(searchData); // Working

  // Reload the page with new data
  // Might be literally impossible. DOM build may be required. -__-

//   axios
//   .get('/', {
//     search: false,
//     searchData,
//   })
//   .then((res) => {
//     console.log('this sucks')
//   });

}

// Function to clear local storage/search history
function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}

// ---------- OMDB API ---------- //

// OMDB Key Variables
const omdbSearch = 'https://www.omdbapi.com/?s=' // change t to s if you want a list of similar movie names
const OMDbApiKey = '&apikey=c26a6eef'
const omdbType = '&type=movie'

// Define the movie searchbar object
const searchEl = document.querySelector("#srch-title");

// Search OMDB using search bar value
async function searchOMDB() {
  // Set up the search parameters
  const searchValue = searchEl.value;
  const searchResult = omdbSearch + searchValue + omdbType + OMDbApiKey

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

