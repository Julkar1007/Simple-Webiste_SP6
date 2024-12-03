document.getElementById("changeTextButton").addEventListener("click", function() {
    document.getElementById("textToChange").textContent = "You clicked the button!";
});



async function createUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const ConfirmPassword = document.getElementById('Confirm-password').value;

    if (password == ConfirmPassword ) {
        await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ username ,password })
        }); 
        alert('signup successful') 
    } else {
       alert('password not match') 
    }  
}


async function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            
            // Save user data in localStorage
            localStorage.setItem('user', JSON.stringify(data.data));
            alert(data.message);
            // Redirect to index.html
            window.location.href = 'index.html';
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
    require('dotenv').config();

}
