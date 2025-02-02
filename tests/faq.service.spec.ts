const { FAQ } = require("../models");
const { client } = require("../config/redis");
const translateText = require("../utils/translation");
const faqService = require("../services/faq.service");

// Mock dependencies
jest.mock("../models", () => ({
  FAQ: {
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

jest.mock("../config/redis", () => ({
  client: {
    get: jest.fn(),
    set: jest.fn(),
    expire: jest.fn(),
  },
}));

jest.mock("../utils/translation", () => jest.fn());

describe("FAQ Service", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("createFAQ", () => {
    it("should create a FAQ with translations", async () => {
      // Arrange
      const question = "What is Node.js?";
      const answer = "Node.js is a JavaScript runtime";
      const targetLang = "es";

      // Mock translation responses
      translateText.mockResolvedValueOnce("¿Qué es Node.js?"); // for question
      translateText.mockResolvedValueOnce(
        "Node.js es un runtime de JavaScript"
      ); // for answer

      // Mock FAQ creation
      FAQ.create.mockResolvedValueOnce({
        question,
        answer,
        translations: {
          [targetLang]: {
            question: "¿Qué es Node.js?",
            answer: "Node.js es un runtime de JavaScript",
          },
        },
      });

      // Act
      const result = await faqService.createFAQ(question, answer, targetLang);

      // Assert
      expect(translateText).toHaveBeenCalledTimes(2);
      expect(translateText).toHaveBeenCalledWith(question, targetLang);
      expect(translateText).toHaveBeenCalledWith(answer, targetLang);

      expect(FAQ.create).toHaveBeenCalledWith({
        question,
        answer,
        translations: {
          [targetLang]: {
            question: "¿Qué es Node.js?",
            answer: "Node.js es un runtime de JavaScript",
          },
        },
      });

      expect(result).toEqual({
        question,
        answer,
        translations: {
          [targetLang]: {
            question: "¿Qué es Node.js?",
            answer: "Node.js es un runtime de JavaScript",
          },
        },
      });
    });
  });
});
