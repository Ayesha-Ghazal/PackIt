--PackIt--

PackIt is a containerized backend application for managing trips and packing items. 
The project demonstrates practical DevOps practices including containerization, 
Infrastructure as Code, Kubernetes orchestration, secure configuration, and automated scaling.

--Project Overview--

PackIt is built with Node.js and Express.js and uses Microsoft SQL Server for data persistence.
The application can be run locally using Docker Compose and deployed on a Kubernetes 
cluster using Minikube.
The project covers the complete journey from application containerization to 
infrastructure provisioning and Kubernetes orchestration.

--Tech Stack--
Node.js 22
Express.js
Microsoft SQL Server
Docker & Docker Compose
Kubernetes
Minikube
Terraform
NGINX Ingress Controller
Kubernetes HPA
Postman
Git & GitHub
Containerization

--Implemented features--

Multi-stage Dockerfile
Docker Compose
Environment-based configuration
Port mapping
Container health check
Production dependency optimization

Build and start the containers:
docker compose up --build

The backend runs on:
http://localhost:5000

Health check:
http://localhost:5000/health

Stop the containers:
docker compose down

--Kubernetes--

The application is deployed on Minikube with:

2 backend replicas
Kubernetes Service
Kubernetes Secret for configuration
PersistentVolumeClaim (1Gi)
NGINX Ingress
CPU and memory resource limits/requests
Horizontal Pod Autoscaler

HPA configuration:
Minimum replicas: 2
Maximum replicas: 5
CPU target: 70%

--Infrastructure as Code--

Terraform is used to provision the PackIt infrastructure declaratively.
The Terraform configuration provisions the PackIt Docker network

--Security & Configuration--

Sensitive database credentials are managed through environment variables and
Kubernetes Secrets instead of being hardcoded into the application.
The .env file is excluded from version control.

--Testing & Verification--

The application has been verified through:

API testing with Postman
Backend health checks
SQL Server connectivity
Docker container testing
Kubernetes deployment verification
Service and Ingress verification
PVC status verification
HPA and resource monitoring

--Key DevOps Outcomes--

Containerized a Node.js backend using Docker
Optimized production image using multi-stage builds
Configured secure environment variables
Provisioned infrastructure using Terraform
Deployed and orchestrated the application with Kubernetes
Configured persistent storage and ingress routing
Implemented automatic horizontal scaling
Monitored application resources and health
Managed project versions using Git and GitHub

--Author--

Ayesha Ghazal
Software Engineering | DevOps