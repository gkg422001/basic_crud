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

