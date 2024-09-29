# SmokeTrees Backend Assignment

This project is a backend application built for SmokeTrees as part of the assignment. The application allows users to register and store their addresses with a one-to-many relationship between users and addresses using a relational database (SQLite). The backend is developed using Node.js.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Database Design](#database-design)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)


## Project Overview

- **Company Name**: SmokeTrees
- **Assignment**: Create a backend where users can register and store their addresses. There are two tables: User and Address, with a one-to-many relationship between users and addresses. The user name is stored in the user table, while the address is stored in the address table.
- **Database**: A relational database (SQLite) is used to store the information.


## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **SQLite**: Relational database to store user and address information


## Database Design

The database contains two tables:

1. **User Table**: Stores user information.
   - Columns: 
     - `id` ( Primary Key )
     - `name` (User's name)
   
2. **Address Table**: Stores address details associated with users.
   - Columns: 
     - `id` ( Primary Key )
     - `address` (User's address)
     - `userId` (Foreign Key referencing the `id` column in the `User` table)

- **One-to-Many Relationship**: A single user can have multiple addresses.  



## Setup and Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/smoketrees-assignment.git 

2. Navigate to the project directory 

    for example :cd smokeTrees-assignment

3. Install dependencies 

    npm install  
    run the above command to install all dependencies 

4. Start the application

    npm start

    By running the above command , the server starts running.

5. The server will run on http://localhost:3000 by default.

6. we can test the API using tools like POSTMAN by passing required data in the body 

# API Endpoints

- POST /register 
    - Description: This endpoint is used to register

    - Request Body :
        - name (String): The name of the user.
        - address (String): The address of the user
    - Response :
        - On success, it stores the information in the User and Address tables and returns a success message.

    - Example :
        ```bash 
        Request Body :

        {
        "name": "John Doe",
        "address": "123 Main St, Springfield"
        }

        Success Response :

        { 
            message: 'successfully Created new user' 
        }

        Failure Response :

          1. when user is already exists

            {
            error_msg: "User already exists"
            }

          2. when an error occurred  while registering .
            for example not providing body data or server side errors

             {
                "error_msg": "An error occurred .The error is <--error -->"
             }









