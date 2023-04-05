# Project Overview

This project is a simple React application that allows users to answer quiz questions created by other users. Users can also view more details about each question after they answer it correctly, including the question text, the available options, the correct option, the author's username and how many correct answers were received to the question and how many wrong. Also there is a ranking page where users can see the top 3 players(users with most correct answers) and the top 3 authors(users with most created questions).

# Components

## App

The App component is the root component of the application. It contains all the major components of the application and the routing logic.

## Header

The Header component is the component that contains the name of the app, the navigation and the user info.
The navigation for a guest user contains the following tabs - Home, Play, Login and Register.
The navigation for a logged user contains - Home, Play, My Questions, Rankings, Logout.
To the top right corner the user can see their username, rank and profile picture.

## Footer

The Footer component is the component that contains the copyright information.

## Hero

The Hero component is the first view the user sees when entering the application. When the user clicks on the Play Now button, they are navigated to the Play page.

## Play

The Play component is the view where the user can play the game and answer questions created by other users.
There is a timer above the question, which counts down 30 seconds. That is the available time that the user has for submitting a response.
A different message is displayed depending on whether the submitted answer is correct or wrong or whether the timer reached zero.

## My Questions

The My Questions component is the view where the user can see all the questions that they created and all the questions by other users that they answered correctly.
On each of the two sections(Created and Answered) there is a button 'View More' which leads to the Details page of the selected question.

## Rankings

The Rankings component is the view where the user can see top 3 users that answered correctly to the most questions and top 3 users that created the most questions.

## Create

The Create component is the view where the user can fill in a form to create a new question.
All fields of the form are required - Question Text, Option A/B/C/D and Correct Option.
Validation is applied to Question Text - it should be at least 30 characters long.
If there are missing values, an error message is displayed.

## Edit

The Edit component is the view where the user can edit in a form an existing question that they created.
Similar to the Create component, all fields of the form are required - Question Text, Option A/B/C/D and Correct Option.
If there are missing values, an error message is displayed.

## Details

The Details component is the view where the user can see details about a question.
Question Text, Option A/B/C/D and Correct Answer are displayed and also a success rate for the question - count of correct answers by users and count of wrong answers.
If the user is the author of the question, they can see Edit and Delete buttons.

## Login

The Login component contains the login form through which the user can authenticate.
The fields are Email and Password, both required.
Validation is applied to the email format.

## Register

The Register component contains the registration form through which the user can create their profile in the application.
The fields are Email, Username, Image Url, Password, Repeat Password and they are all required.
Validation is applied to Email format and Password length.

## Logout

The Logout component contains the logic that logs out the user and deletes authentication data from the current user session.

## ErrorBox

The Error Box component is an element that displays errors from other components in the app, mainly for forms validation.

# Contexts

## AuthContext

The AuthContext manages the user authentication in the app. It contains the main handler functions for the Login and Register forms. It provides information globally to the app if there is a logged user or the app is used by a guest.
It also contains the handler function for when the user submits a response in the Play page. If there is a logged user, it saves each user response.

## QuestionContext

The QuestionContext contains the handler functions for the CRUD operations related to questions.

# Hooks

## useForm

The useForm custom hook helps to easily create controlled forms without having to create state variable and change handler function for each field in a form. When used, it returns a values object, universal change handler function for all fields, submit handler, change values handler and reset values handler.

# Services

## authService

The authService contains all functions that handle direct HTTP requests related to user authentication.

## questionsService

The questionsService contains all functions that involve HTTP requests to the questions data on the server.

## userStatsService

The userStatsService contains all functions that are related to storing user responses to questions and getting user general statistics for correct and wrong answers.

# Route Guards

## RouteGuard

It serves to prevent guests to access certain paths. If a guest tries to access some protected path, the Login page will be rendered.

## QuestionOwner

All registered users can respond to questions that were created by someone else but they cannot edit or delete the questions of others. To prevent them for doing that, the QuestionOwner guard is used.

# Validators

The Validators file contains functions that validate the form data of Login, Register, Create/Edit Question and Play forms. Each validation function returns an error object if one of the fields is not valid.

# Usage

To use this application, follow these steps:

Click on Play and start answering questions.
If you are not registered, your results will not be saved.
You can go to the Register page to create a profile.
Then you can go to the Play page again and this time all your responses will be saved.
You can go to the My Questions Page to create, edit or delete your own questions or to view details about questions you answered correctly.
You can check the Rankings page to see the top 3 responders and the top 3 question authors.

# Installation and Setup

To install and run this project locally, follow these steps:

Clone the repository to your local machine.
Install the dependencies by running npm install.
Start the development server by running 'npm start'.
Clone the SoftUni Practice Server repository and run it in new terminal with 'node server.js' : https://github.com/softuni-practice-server/softuni-practice-server
Open your web browser and navigate to http://localhost:3000.