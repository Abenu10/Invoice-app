# Invoice Manager

A full-stack application for managing invoices, built with Next.js, Nest.js, Postgres, and Prisma stack.

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Features 🚀

- Create, view, update, and delete invoices 📊
- Responsive design for desktop and mobile devices 📱💻
- Export invoices as PDF files 📄 or Excel files 📊
- Authentication for secure user management 🔒

## Built With 🛠️

- Next.js - Frontend framework
- Nest.js - Backend framework
- Postgres - Database
- Prisma - ORM
- Docker - Containerization

## Getting Started 🚀

Clone the repository:

```bash
 git clone https://github.com/Abenu10/Invoice-app.git
```

Install dependencies & Start the front-end

```bash
  cd frontend
  yarn
  yarn run dev
```

Install dependencies & Start the backend

```bash
  cd backend
  yarn
  npm run start:dev
```

If you have docker

```bash
 docker-compose up
```

**The application should now be running at http://localhost:3000**

## 🐳 Docker Deployment

This application is also set up to run in Docker containers. Here's how you can get started:

### Prerequisites

- Docker
- Docker Compose

1.  **Building the Docker Image:**

To build the Docker image for the backend service, run the following command:

```sh
docker-compose build
```

2. **Start the Docker containers:**

```sh
docker-compose up
```

## 🐳 You can also pull the Docker image from Docker Hub: 🐳

```sh
docker pull abenu/invoice-manager-backend

```
