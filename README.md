# HTML, CSS and JS App
This repository contains an application using HTML, CSS, JS for the frontend and FastApPI for the backend. Follow the instructions below to set up and run the application.
# Prerequisites

### 1. Git (Clone the repository)
### 2. FastAPI framework:
```bash
pip install fastapi
```
### 3. Python 3.7 or higher
### 4. Firebase Admin SDK:
```bash
pip install firebase-admin
```
### 5. Additional Python packages:
```bash
pip install uvicorn
pip install pydantic[email]
pip install passlib[bcrypt]
```

# Installation and Setup
Note: Make sure you have completed the prerequisites before proceeding

### 1. Clone the repository
```bash
git clone https://github.com/gkg422001/basic_crud.git
```
or use tools like GitKraken, SourceTree or any tool you are comfortable with.
### 2. In your Firebase Account Create a New Project
![Image](https://github.com/user-attachments/assets/b07de18a-4f63-454c-aa9b-ea956e462ffa)

### 3. After creating a new project click the settings icon and navigate to project settings
![Image](https://github.com/user-attachments/assets/b9a131f6-94b5-4074-8d5b-5e965d9e0601)

### 4. Once in project settings, navigate to Service Accounts and click on generate new private key
![image](https://github.com/user-attachments/assets/1f8bb9c3-529d-4917-8916-3f5b12106222)

### 5. Once done, rename the json file to anything you want and open the cloned project. After opening the cloned project navigate to the backend folder and main.py file. In the main.py file locate this line of code "cred = credentials.Certificate(r"C:\Users\user\Documents\JSON\service_account.json")" and change the path to wherever you saved the renamed json file.
![Image](https://github.com/user-attachments/assets/e5be10a9-1ee2-4f61-8a58-9e93ffaf75ab)

### 6. After the configuration you can run the backend server using the command
```bash
uvicorn backend.app.main:app --reload
```
Note that backend.app.main is the specified module path based on the your root folder path.

### 7. After running the server. Navigate to the file where the html files are located and open it with google chrome.
![Image](https://github.com/user-attachments/assets/233c3c9b-370b-4204-9367-4d2330c6980d)

# Sample Requests and Responses
EndPoints
![Image](https://github.com/user-attachments/assets/120a9d43-ff1e-4a59-acd9-9159c1b9b086)

1. Request and Response for /users
![Image](https://github.com/user-attachments/assets/33e2c49e-baf0-4d58-a15b-67442e44153a)

2. Request and Response for /userById/{id}
![Image](https://github.com/user-attachments/assets/c843a0b6-50b6-4e99-9268-be99fb075063)

3. Request and Response for /createUser/
![Image](https://github.com/user-attachments/assets/bb1d205a-f61a-4c12-91b5-5155262ca94a)

4. Request and Response for /updateUser/{id}
![Image](https://github.com/user-attachments/assets/26ded3a1-f77c-4906-997e-3fc64c357a00)

5. Request and Response for /deleteUser/{id}
![Image](https://github.com/user-attachments/assets/1f9a2714-6480-4ba7-9474-f3164c4a8e74)

6. Request and Response for /login/
![Image](https://github.com/user-attachments/assets/c1706efd-5466-4d02-9f37-328b9d32ff11)

# FrontEnd Screenshots
1. Login
![Image](https://github.com/user-attachments/assets/c4d53ce6-0a6e-4d48-9375-679bb8653769)

2. SignUp
![image](https://github.com/user-attachments/assets/aa7e9485-145c-460c-9c52-8d451c37212b)

3. Home
![image](https://github.com/user-attachments/assets/6fedf32c-30d6-4abf-96d5-429540b06f89)

4. Edit User Modal
![image](https://github.com/user-attachments/assets/5cd08d7f-fd50-49e2-bfd4-9296292e41bd)

5. Delete
![image](https://github.com/user-attachments/assets/8dafcedc-023b-4893-9773-7bfe3fe15d3a)

6. Save
![image](https://github.com/user-attachments/assets/f3227ba1-ba67-416c-9c45-cc4878a27263)



