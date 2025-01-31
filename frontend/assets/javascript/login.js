document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-form');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    
    // API Config
    const API_BASE_URL = 'http://localhost:8000';
    const api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = emailInput.value;
        const password = passwordInput.value;

        try {
            const response = await api.post(`/login/`, {
                username: username,
                password: password
            });

            if (response.data.message === "Login successful") {
                window.location.href = 'home.html';
            }

        } catch (error) {
            let errorMessage = 'Login failed. ';
            if (error.response && error.response.data) {
                if (error.response.status === 401) {
                    // errorMessage = 'Invalid email or password.';
                    errorMessage = error.response.data.detail;
                } else {
                    errorMessage = error.response.data.detail;
                }
            } else if (error.request) {
                errorMessage = 'Unable to connect to server. Please try again.';
            } else {
                errorMessage = 'An unexpected error occurred.';
            }
            alert(errorMessage);
            console.error('Error:', error);
        }
    });

    // Handle Signup Link
    document.querySelector('.signup-link a').addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'signup.html';
    });
});