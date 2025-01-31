document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('.signup-form');
    const passwordInput = document.querySelector('input[name="password"]'); //NEW
    const passwordError = document.querySelector('.password-error'); //NEW
 
    // API Config
    const API_BASE_URL = 'http://localhost:8000';
    const api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    });


    // Validate password length
    passwordInput.addEventListener('input', function() {
        if (this.value.length <= 5) {
            passwordError.textContent = 'Password must be more than 5 characters';
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });

    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form values
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const firstName = document.querySelector('input[name="firstName"]').value;
        const lastName = document.querySelector('input[name="lastName"]').value;

        if (password.length <= 5) {
            passwordError.textContent = 'Password must be more than 5 characters';
            passwordError.style.display = 'block';
            return; 
        }

        try {         
            const createUserResponse = await api.post(`/createUser/`, {
                username: username,
                password: password,
                FirstName: firstName,
                LastName: lastName
            });

            alert('Signup successful!');
            window.location.href = 'home.html';
        } catch (error) {
            let errorMessage = 'Signup failed. ';
            if (error.response) {
                // Display the specific error from the backend
                errorMessage = error.response.data.detail || error.response.data.message;
                if (errorMessage.includes('Password must be more than 5 characters')) {
                    passwordError.textContent = errorMessage;
                    passwordError.style.display = 'block';
                } else {
                    alert(errorMessage);
                }
            } else if (error.request) {
                errorMessage += 'No response from server. Please try again.';
                alert(errorMessage);
            } else {
                errorMessage += 'An unexpected error occurred.';
                alert(errorMessage);
            }
            console.error('Error:', error);
        }
    });
});