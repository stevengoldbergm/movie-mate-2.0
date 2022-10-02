const signupFormHandler = async (event) => {
    event.preventDefault();
    // console.log('form submitted')
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const retypePassword = document.querySelector('#retypepassword-signup').value.trim();

    if (username && email && password && retypePassword) {
      if (password===retypePassword){
      // console.log('post sent')
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
       if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
        console.log('error found')
      }
    } 
    else {
      alert('Passwords do not match')
    }     
    }
  }
  

  document
  .querySelector('#submit')
  .addEventListener('submit', signupFormHandler);