# PackIt

PackIt is a containerized backend application developed as part of the DevOps internship Task 2: Application Containerization & Asset Optimization.

The project demonstrates application containerization using Docker, multi-stage Docker builds, secure environment configuration, Docker Compose, port mapping, health checks, and API testing.

## Project Overview

PackIt provides backend APIs for managing trips and packing items.

The backend is built using Node.js and Express.js and uses Microsoft SQL Server as the database.

The application has been successfully containerized using Docker and can be managed using Docker Compose.

## Technologies Used

- Node.js 22
- Express.js
- Microsoft SQL Server
- Docker
- Docker Compose
- Postman
- Git
- GitHub


## Docker Features

- Multi-stage Dockerfile
- Lightweight Node.js Alpine image
- Production-only dependencies
- Environment variable configuration
- Docker Compose
- Port mapping
- Container health check
## Running the Application

Build and start the containers:
docker compose up --build

The backend runs on:
http://localhost:5000


Health check:
http://localhost:5000/health


Stop the containers:
docker compose down

## Environment Variables

Database credentials are stored in `backend/.env` and are not committed to GitHub.


## Testing

The containerized backend was tested using Postman and successfully verified for:

- API requests
- SQL Server connectivity
- Health check
- Port 5000 accessibility