const request = require("supertest");
const app = require("../server");
const faqService = require("../services/faq.service");
const redis = require("../config/redis");
const ErrorHandler = require("../utils/errorHandler");

// Mock the logger
jest.mock("../utils/logger", () => ({
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn()
}));

// Mock the FAQ service
jest.mock("../services/faq.service", () => ({
  getFAQFromCache: jest.fn(),
  createFAQ: jest.fn(),
  deleteFAQById: jest.fn()
}));

// Set test environment
process.env.NODE_ENV = 'test';

describe("FAQ Controller Tests", () => {
    let server;

    beforeAll(async () => {
        server = app.listen(0);
    });

    afterAll(async () => {
        await redis.quit();
        await new Promise((resolve) => server.close(resolve));
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/faq", () => {
        it("should fetch FAQs from cache if available", async () => {
            const mockFAQs = [
                { question: "What is your return policy?", answer: "You can return items within 30 days." }
            ];

            faqService.getFAQFromCache.mockResolvedValue(mockFAQs);
            
            const response = await request(server)
                .get("/api/faq?lang=en");
            
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toEqual(mockFAQs);
            expect(faqService.getFAQFromCache).toHaveBeenCalledWith('en');
        });

        it("should handle errors properly", async () => {
            faqService.getFAQFromCache.mockRejectedValue(new Error("Test error"));
            
            const response = await request(server)
                .get("/api/faq?lang=en");
            
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Test error");
        });
    });

    describe("POST /api/faq", () => {
        it("should create a new FAQ", async () => {
            const newFAQ = { 
                question: "What is the warranty period?", 
                answer: "1 year.",
                lang: "en"
            };
            
            faqService.createFAQ.mockResolvedValue({
                _id: "12345",
                ...newFAQ,
            });
            
            const response = await request(server)
                .post("/api/faq")
                .send(newFAQ);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data._id).toBe("12345");
        });

        it("should return an error if question or answer is missing", async () => {
            const response = await request(server)
                .post("/api/faq")
                .send({ lang: "en" });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Question and answer are required");
        });
    });

    describe("DELETE /api/faq/:id", () => {
        it("should delete an FAQ", async () => {
            const faqId = "12345";
            const mockDeletedFAQ = {
                _id: faqId,
                question: "What is your return policy?",
                answer: "You can return items within 30 days.",
            };

            faqService.deleteFAQById.mockResolvedValue(mockDeletedFAQ);

            const response = await request(server)
                .delete(`/api/faq/${faqId}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe(`Faq ${faqId} Deleted.`);
            expect(response.body.data).toEqual(mockDeletedFAQ);
        });

        it("should return error if FAQ not found", async () => {
            const faqId = "non-existent-id";
            // Create a custom error object instead of using ErrorHandler
            const error = { 
                statusCode: 404, 
                message: "FAQ not found" 
            };
            faqService.deleteFAQById.mockRejectedValue(error);

            const response = await request(server)
                .delete(`/api/faq/${faqId}`);

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("FAQ not found");
        });
    });
});
