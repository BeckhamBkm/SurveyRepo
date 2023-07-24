
# SurveyApp

SurveyApp is a web application that allows users to answer survey questions and stores their responses in a MongoDB database. The app provides a dynamic interface to display survey questions in various formats and record user responses.

# Features
User authentication: Users can log in and out of the application to answer survey questions.
Dynamic survey questions: Questions are fetched from a MongoDB database and rendered based on their input formats (numerical, text, checkbox, multiple select).
Storing user responses: User responses to survey questions are saved in the database.
CSV export: Admin users can download survey responses in CSV format for analysis.
Technologies Used
Front-end: React
Back-end: Node.js, Express
Database: MongoDB
State Management: React Context API and useReducer
Authentication: bcrypt for password hashing
Styling: CSS

# Installation
Clone the repository: git clone <repository-url>
Navigate to the project directory: cd SurveyApp
Install dependencies for the server: npm install
Navigate to the client directory: cd client
Install dependencies for the client: npm install
Configuration
Before running the application, you need to set up the environment variables.

# Create a .env file in the root directory with the following content:

DB_URI=your_mongodb_connection_uri
PORT=3001
Replace your_mongodb_connection_uri with your actual MongoDB connection string.

# Running the Application
In the root directory, start the server: npm start
In the client directory, start the React app: npm start
The server will run on http://localhost:3001, and the client app will be available at http://localhost:3000.

# Usage
Open your web browser and navigate to http://localhost:3000.
If you are not logged in, you will be redirected to the login page. You can log in with your username and password or create a new account.
Once logged in, you will be presented with survey questions. Answer each question based on the provided input format.
Click the "Next" button to proceed to the next question.
If you want to go back to a previous question, click the "Previous" button.
After answering all the questions, you will see the survey responses. Admin users can also download the responses in CSV format.
Acknowledgments
SurveyApp was created as part of a learning project to explore React, Node.js, Express, and MongoDB. Special thanks to all the open-source contributors whose libraries and frameworks made this project possible.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

Feel free to use this project for learning, personal use, or as a basis for your own projects.
