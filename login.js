document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();  /*Prevent the form from submitting */


    var user = JSON.parse(localStorage.getItem('userDetails'))
    

// Clear previous error message
    document.getElementById('username').classList.remove('error')
    document.getElementById('usernameError').style.display = 'none'
    document.getElementById('password').classList.remove('error')
    document.getElementById('passwordError').style.display = 'none'
    document.getElementById('none').style.display = 'none'


    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let valid = true

// Validate fields
    if(username.trim() === '') {
        valid = false;
        document.getElementById('username').classList.add('error');
        document.getElementById('usernameError').style.display = 'block'
    }else if (username !== user.userName)  {
        valid = false;
        // console.log('Username is incorrect')
        document.getElementById('username').classList.add('error');
        // document.getElementById('usernameError').style.display = 'block'
        document.getElementById('none').style.display = 'block'
    }


    // Validate the password field
    if(password.trim() === '') {
        valid = false;
        document.getElementById('password').classList.add('error');
        document.getElementById('passwordError').style.display = 'block'
    }else if (password !== user.pass) {
        console.log(user.pass)
        valid = false;
        // console.log('Password is incorrect');
        document.getElementById('password').classList.add('error');
        // document.getElementById('passwordError').style.display = 'block'
        document.getElementById('none').style.display = 'block'
    }


    // if the form is valid,proceed with form submission
    if (valid) {
        alert('Successfully')
        window.location.href = 'client.html'
    }
    
})

