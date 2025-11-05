# Project Name

  

> Full-stack Authentication App with NestJS, MongoDB, and React

  

---

  

## Overview

  

This project demonstrates a full-stack authentication system:

  

- Users can **sign up**, **sign in**, and **view their profile**.

- **JWT** is used for authentication and protecting routes.

- Passwords are hashed using **bcrypt**.

- Backend is built with **NestJS + MongoDB**.

- Frontend is a React app using **React Query**.

  

---

  

## Tech Stack

  

- **Backend:** NestJS, TypeScript, MongoDB, Mongoose, JWT, bcrypt

- **Frontend:** React, React Query

- **Docker:** Docker Compose for running backend, frontend, and database

  

---

  

## Getting Started

  

### Requirements

  

- Docker & Docker Compose installed

  

### Run the Application

`# Start backend, frontend, and MongoDB`

`docker compose up -d --build`
or `make up`

navigate to  http://localhost:5173/


## Notes

- Logging is enabled via **NestJS Logger**.

- Passwords are hashed using **bcrypt**.

- JWT is used to protect routes.

- **Swagger** will be used to document all API endpoints

`# Stop the application`
`docker compose down`
or `make down`
