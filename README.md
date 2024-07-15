# Introduction
This project is a single-page application built with React and TypeScript for user registration and login. The backend is powered by a GraphQL API with MongoDB as the database. The application is designed to be deployed on Azure.  
The application is seperated in the ui which is our presentation layer and server which is our api layer.

# Getting Started
## Prerequisites
Node.js v18 
npm  

# Installation
## Clone the repository:
git clone https://github.com/Vanrenen/zenysis-app.git  
cd zenysis-app
npm install

## Running the App
npm start  

## Setting up the api
python -m venv venv  
source venv/bin/activate  
pip install uvicorn fastapi  
uvicorn api:app --reload  

## Techstack
React  
Typescript  
EmotionJS  
MUI 
Jest 

# Testing
Testing is done usng jest where some simple unit tests were included

# Extra functionality I did not have time to implement
Use Bcrypt salt to hash passwords  
Add rate limiting on API's 
Endless scrolling  
Paging  
Evironment variables setup  
Use custom hooks for api calls  
Adding more tests  
