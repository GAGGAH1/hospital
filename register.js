document.getElementById('regForm').addEventListener('submit', function(event){
    event.preventDefault();  

    document.getElementById('fName').classList.remove('error');
    document.getElementById('fNameError').style.display = 'none';
    document.getElementById('lname').classList.remove('error');
    document.getElementById('lNameError').style.display = 'none';
    document.getElementById('username').classList.remove('error');
    document.getElementById('usernameError').style.display = 'none';
    document.getElementById('password').classList.remove('error');
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('password2').classList.remove('error');
    document.getElementById('re_passwordError').style.display = 'none';
    document.getElementById('lengthError').style.display = 'none';


    let pwd2 = document.getElementById('password2').value;
    let valid = true
    

    let formData = {
        Fname:document.getElementById('fName').value,
        Lname:document.getElementById('lname').value,
        userName:document.getElementById('username').value,
        pass:document.getElementById('password').value
    };


    if(formData.Fname === ''){
        valid = false;
        document.getElementById('fName').classList.add('error');
        document.getElementById('fNameError').style.display = 'block';
    }else if(formData.Lname === ''){
        valid = false;
        document.getElementById('lname').classList.add('error');
        document.getElementById('lNameError').style.display = 'block';
    }else if(formData.userName === ''){
        valid = false;
        document.getElementById('username').classList.add('error');
        document.getElementById('usernameError').style.display = 'block';
    }else if(formData.pass === ''){
        valid = false;
        document.getElementById('password').classList.add('error');
        document.getElementById('passwordError').style.display = 'block';
    }else if (formData.pass.length < 8){
        valid = false;
        document.getElementById('lengthError').style.display = 'block';
    }else if(pwd2 === ''){
        vaild = false;
        document.getElementById('password2').classList.add('error');
        document.getElementById('re_passwordError').style.display = 'block';
    }
    else if(pwd2 != formData.pass){
        valid = false;
        document.getElementById('password2').classList.add('error');
        document.getElementById('re_passwordError').style.display = 'block';

    }

    else{
        valid = true;
        let formDataJson = JSON.stringify(formData);
        localStorage.setItem('userDetails', formDataJson);
        alert('Registered Successfully');
    }

    
    
});

