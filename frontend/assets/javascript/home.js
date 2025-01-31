// API config
const API_BASE_URL = 'http://localhost:8000';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

let currentEditEmail = null;

// Function to fetch and render users
async function fetchAndRenderUsers() {
    try {
        const response = await api.get('/users');
        const users = response.data;
        renderUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        showError('Failed to fetch users. Please try again later.');
    }
}

// Function to render users table
function renderUsers(users) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.FirstName}</td>
            <td>${user.LastName}</td>
            <td>
                <button class="btn btn-edit" onclick="editUser('${user.username}')">Edit</button>
                        <button class="btn btn-delete" onclick="deleteUser('${user.username}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to show error message
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
}

// Function to open edit modal
async function editUser(Email) {
    try {
        const email = decodeURIComponent(Email);
        console.log("Fetching user details for:", email);
        const response = await api.get(`/userById/${Email}`);
        const user = response.data;

        currentEditEmail = email;
        document.getElementById('editEmail').value = user.username;
        document.getElementById('editFirstName').value = user.FirstName;
        document.getElementById('editLastName').value = user.LastName;
        document.getElementById('editModal').style.display = 'block';
        document.getElementById('errorMessage').textContent = '';
    } catch (error) {
        console.error('Error fetching user details:', error);
        showError('Failed to fetch user details. Please try again later.');
    }
}

// Function to save edited user
async function saveEdit() {
    try {
        const updatedUser = {
            username: currentEditEmail,
            FirstName: document.getElementById('editFirstName').value,
            LastName: document.getElementById('editLastName').value
        };

        await api.put(`/updateUser/${currentEditEmail}`, updatedUser);
        await fetchAndRenderUsers();
        alert('Saved Successfully.');
        closeModal();
    } catch (error) {
        console.error('Error updating user:', error);
        showError('Failed to update user. Please try again later.');
    }
}

// Function to delete user
async function deleteUser(email) {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            await api.delete(`/deleteUser/${email}`);
            await fetchAndRenderUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            showError('Failed to delete user. Please try again later.');
        }
    }
}

// Function to close modal
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
    currentEditEmail = null;
    document.getElementById('errorMessage').textContent = '';
}

// Function to handle logout
function logout() {
    window.location.href = 'login.html';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Initial fetch and render
fetchAndRenderUsers();