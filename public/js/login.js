const { format } = require("mysql2");

const loginFormHandler = () => console.log('form submitted')
// async (event) => {
//   event.preventDefault();
//   // Collect values from the login form
  // const email = document.querySelector('#email').value.trim();
  // const password = document.querySelector('#password').value.trim();

  
  // console.log(email)
  // console.log(password)
  // if (email && password) {
  //   // Send a POST request to the API endpoint
  //   const response = await fetch('/api/users/login', {
  //     method: 'POST',
  //     body: JSON.stringify({ email, password }),
  //     headers: { 'Content-Type': 'application/json' },
  //   });

  //   if (response.ok) {
  //     // If successful, redirect the browser to the profile page
  //     document.location.replace('/profile');
  //   } else {
  //     alert(response.statusText);
  //   }
  // }
// };

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    console.log('post sent')
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#submit')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
