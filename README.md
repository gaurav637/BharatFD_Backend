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

## Available Endpoints

   ### Create a New FAQ
   - **Endpoint:** POST `/api/faq/create?lang=bh`
   - **Description:** Creates a new FAQ.
   - **Request Body:**
     ```json
      {
          "question": "How can I track my order?",
          "answer": "You can track your order using the tracking link"
      }
  
   - Response:
     - 201 Created
      ```json
        {
            "success": true,
            "message": "FAQ 679f8be157a8c7e369f124aa Created:",
            "data": {
                "question": "How can I track my order?",
                "answer": "You can track your order using the tracking link",
                "translations": {
                    "bh": {
                        "question": "हम अपना ऑर्डर के कइसे ट्रैक कर सकीले?",
                        "answer": "ट्रैकिंग लिंक के इस्तेमाल से रउआ आपन ऑर्डर के ट्रैक कर सकेनी",
                        "_id": "679f8be157a8c7e369f124ab"
                    }
                },
                "_id": "679f8be157a8c7e369f124aa",
                "createdAt": "2025-02-02T15:14:41.310Z",
                "updatedAt": "2025-02-02T15:14:41.310Z",
                "__v": 0
          }
        }
      ```

  - ### Get All FAQ

    - **Endpoint:** GET `/api/faq/fetch?lang=hi`
    - **Description:** Retrieves a list of all FAQ.
    - **Response:**
       - 200 OK
           ```json
            [
              "success": true,
              "data": [
                  {
                      "question": "अपने ऑर्डर पर मेरी नज़र कैसे रह सकती है?",
                      "answer": "आप अपने पुष्टिकरण ईमेल में दिए गए ट्रैकिंग लिंक का उपयोग करके अपने ऑर्डर को ट्रैक कर सकते हैं।"
                  },
                  {
                      "question": "अपने ऑर्डर पर मेरी नज़र कैसे रह सकती है?",
                      "answer": "आप अपने पुष्टिकरण ईमेल में दिए गए ट्रैकिंग लिंक का उपयोग करके अपने ऑर्डर को ट्रैक कर सकते हैं।"
                  } 
              ]
            ]
    
          ```
  - ### Create a New FAQ
    - **Endpoint:** DELETE `/api/faq/delete/679f12abde9b44510e00cf4a`
    - **Description:** Delete a FAQ.
    - Response:
     - 200 OK
      ```json
        {
            "success": true,
            "message": "Faq 679f13d9e44fc16c8faf754f  Deleted.",
            "data": {
                "_id": "679f13d9e44fc16c8faf754f",
                "question": "How can I track my order?",
                "answer": "You can track your order using the tracking link provided in your confirmation email.",
                "translations": {
                    "bh": {
                        "question": "हम अपना ऑर्डर के कइसे ट्रैक कर सकीले?",
                        "answer": "रउआँ अपना कन्फर्मेशन ईमेल में दिहल गइल ट्रैकिंग लिंक के इस्तेमाल करके आपन ऑर्डर के ट्रैक कर सकत बानी।",
                        "_id": "679f13d9e44fc16c8faf7550"
                    }
                },
                "createdAt": "2025-02-02T06:42:34.084Z",
                "updatedAt": "2025-02-02T06:42:34.084Z",
                "__v": 0
            }
        }
      ```     
  
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

npm start        # Build 
npm test         # Run tests
npm run commit   # Git commit
````

```bash
docker-compose up -d
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
