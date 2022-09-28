// Set up OMDB search options

// OMDB Key Variables
const omdbSearch = 'https://www.omdbapi.com/?s=' // change t to s if you want a list of similar movie names
const OMDbApiKey = '&apikey=c26a6eef'
const omdbType = '&type=movie'

// Add navbar functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  });

// Add modal functionality
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

async function searchOMDB() {
  // Set up the search parameters
  const searchEl = document.querySelector("#srch-title");
  const searchValue = searchEl.value;
  const searchResult = omdbSearch + searchValue + omdbType + OMDbApiKey

  // Start search
  const response = await fetch(searchResult)
  const data = await response.json();
  return data;
  
  // fetch(searchResult)
  // .then((res) => {
  //   console.log("response", res);
  //   console.log("response status: ", res.status);
  //   return res.json();
  // })
  // .then((data) => {
  //   // console.log("data", data) // Working
  //   return data;
  // })

}