# Author : Deekshith Kandregula

This project is a small portal built with Angular for the frontend, Node.js (server.js) as the backend, and MySQL as the database. It includes:

Signup Page: Users can register, and their data is stored in MySQL.
Login Page: Registered users can log in to access the home page.
Home Page: Displays content after successful login.

Prerequisites
Node.js installed on your system.
MySQL database set up and running.
Angular CLI installed globally.

Backend Setup: 
  Navigate to the backend directory:
  
    cd Backend
  Install dependencies:
  
    npm install
  Configure your MySQL connection in the backend code (Server.js). Ensure you have the correct credentials and database.
  Start the backend server:
  
    node server.js

Frontend Setup:
  Navigate to the Angular project directory:
  
    cd Frontend
  Install dependencies:
  
    npm install
  Start the Angular development server:
  
    ng serve
  Open your browser and navigate to the url:
  
    http://localhost:4200/
