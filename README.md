# FULLSTACK TWITTER X CLONE

A full-stack Twitter clone application built with Node.js, Express, MongoDB, and React.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete tweets
- Follow and unfollow users
- Like and comment on tweets
- Real-time notifications

## Project Structure

The project is divided into two main folders:

1. **Backend**
2. **Frontend**

### Backend

The backend of the application is built using Node.js, Express, and MongoDB.

#### Installation

1. Navigate to the `backend` folder:
    ```sh
    cd backend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
**MongoDB**
    
Create a `.env` file in the `backend` folder and add the following environment variables:

env
PORT=8080
MONGO_URL=mongodb+srv://your_mongodb_url
TOKEN_SECRET=your_token_secret
Replace your_mongodb_url with your actual MongoDB connection string and your_token_secret with a secret key for JWT.


You have to go [MongoDB](https://www.mongodb.com/) wensite and have to create new database , then create url and paste it to MONGO_URL. 





##Running the Server
To start the server in development mode, run:\

                   npm run dev

The server will start on the port defined in the .env file.

##Frontend
The frontend of the application is built using React and Redux.

Installation
1. Navigate to the frontend folder:  

                 cd frontend
2. Install the dependencies:

                 npm install
3. Running the Frontend
To start the frontend development server, run:

                npm start
The application will open in your default web browser.


**Contributing**

Contributions are welcome! Please fork the repository and create a pull request to contribute to this project.

**Contact**

If you have any questions or feedback, feel free to reach out.
