# Project Overview

This project is a simple React application that allows users to answer quiz questions created by other users. Users can also view more details about each question after they answer it correctly, including the question text, the available options, the correct option, the author's username and how many correct answers were received to the question and how many wrong. Also there is a ranking page where users can see the top 3 players(users with most correct answers) and the top 3 authors(users with most created questions).

# Components

## App

The App component is the root component of the application. It contains all the major components of the application and the routing logic.

## Header

The Header component is the component that contains the name of the app, the navigation and the user info.

## Footer

The Footer component is the component that contains the copyright information.

## Hero

The Hero component is the first view the user sees when entering the application.

## Play

The Play component is the view where the user can play the game and answer questions created by other users.

## My Questions

The My Questions component is the view where the user can see all the questions that they created and all the questions by other users that they answered correctly.

## Rankings

The Rankings component is the view where the user can see top 3 users that answered correctly to the most questions and top 3 users that created the most questions.

## Create

The Create component is the view where the user can fill in a form to create a new question.

## Edit

The Edit component is the view where the user can edit in a form an existing question that they created.

## Details

The Details component is the view where the user can see details about a question. If the user is the author of the question, they can see Edit and Delete buttons.

## Login

The Login component contains the login form through which the user can authenticate.

## Register

The Register component contains the registration form through which the user can create their profile in the application.

## Logout

The Logout component contains the logic that logs out the user and deletes authentication data from the current user session.

## ErrorBox

The Error Box component is an element that displays errors from other components in the app.

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