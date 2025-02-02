# Multilingual FAQ System

A RESTful API service for managing FAQs and other resources.

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
git clone https://github.com/yourusername/bharatfd-api.git
cd bharatfd-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

4. Configure the environment variables:

````bash
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# MongoDB
MONGODB_URI=mongodb://localhost:27017/bharatfd

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379



5. Start the server:

```bash
npm start
````

## API Documentation

The API is documented using Swagger. You can access the documentation at:

```bash
http://localhost:3000/api-docs
```

### Available Endpoints

- `GET /api/v1/faqs` - Get all FAQs
- `POST /api/v1/faqs` - Create new FAQ
- `PUT /api/v1/faqs/:id` - Update FAQ
- `DELETE /api/v1/faqs/:id` - Delete FAQ
- `GET /api/v1/faqs/:language` - Get FAQs by language

## Environment Variables

````bash

# MongoDB
MONGODB_URI=mongodb://localhost:27017/bharatfd

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

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
npm run build
```

2. Start the production server:

```bash
npm run start:prod
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
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
