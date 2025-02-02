# Multilingual FAQ System

The Multilingual FAQ System is a RESTful API service designed to manage frequently asked questions (FAQs) with multilingual support. It includes caching for improved performance, robust error handling, and a well-structured API for easy integration. Built with Node.js, Express.js, MongoDB, and Redis, this system ensures efficient retrieval and management of FAQs.

## Features

- FAQ management with multilingual support
- Caching for improved performance
- Error handling middleware
- CORS enabled
- Environment configuration

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Redis (for caching)
- Docker

## Prerequisites

- Node.js (v20 or higher)
- MongoDB
- Redis
- Docker (optional)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/gaurav637/BharatFD_Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
.example
```

4. Configure the environment variables:

````bash
# Application
PORT=8080

# MongoDB
MONGO_URI=mongodb://localhost:27017/bharatfd

# Redis
REDIS_URI=localhost
````

5. Start the server:

```bash
npm start
````

## API Documentation

The API is documented using Swagger. You can access the documentation at:

```bash
http://localhost:8080/docs
```

### Available Endpoints

- `GET /api/faq/fetch` - Get all FAQs
- `GET /api/faq/fetch?lang=hi` - Get all FAQs in specific language 
- `POST /api/faq/create` - Create new FAQ
- `DELETE /faq/v1/delete/:id` - Delete FAQ


## Environment Variables

````bash

# MongoDB
MONGO_URI=mongodb://localhost:27017/bharatfd

# Redis
REDIS_HOST=localhost
````

## Scripts

```bash
npm run start:dev    # Start development server
npm run build       # Build for production
npm run start:prod  # Start production server
npm run test       # Run tests
npm run test:e2e   # Run end-to-end tests
npm run lint       # Run linter
````

```bash
docker-compose up -d
```

### Manual Deployment

1. Build the application:

```bash
npm start
```


## Flow Diagram:- 

<img width="751" alt="Screenshot 2025-02-02 at 7 00 17 PM" src="https://github.com/user-attachments/assets/f6111593-a3ee-4d81-b217-811a01aeab65" />

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`npm run commit`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add new feature
fix: bug fix
docs: documentation updates
style: formatting, missing semicolons, etc
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```
