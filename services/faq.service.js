const { FAQ } = require("../models");
const { client } = require('../config/redis');
const translateText = require("../utils/translation");
const ErrorHandler = require("../utils/errorHandler");

const getFAQFromCache = async (lang = 'en') => {
    try {
        const cachedFAQs = await client.get(`faqs:${lang}`);
        if (cachedFAQs) {
            return JSON.parse(cachedFAQs);
        }
        return [];
    } catch (error) {
        throw new Error('Error fetching FAQs from cache');
    }
};

const createFAQ = async (question, answer, targetLang = 'en') => {
    try {
        const translatedQuestion = await translateText(question, targetLang);
        const translatedAnswer = await translateText(answer, targetLang);

        const faq = await FAQ.create({
            question,
            answer,
            translations: {
                [targetLang]: {
                    question: translatedQuestion,
                    answer: translatedAnswer,
                },
            },
        });
        return faq;
    } catch (error) {
        throw new Error(error.message);
    }
};

const saveFAQToCache = async (lang, faqs) => {
    try {
        const cacheKey = `faqs:${lang}`;
        const data = JSON.stringify(faqs);
        await client.set(cacheKey, data);
        await client.expire(cacheKey, 3600);
        return faqs;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllFAQs = async () => {
  try {
    const faqs = await FAQ.find();
    if (!faqs || faqs.length === 0) {
      throw new ErrorHandler("Not found", 404);
    }
    return faqs;
  } catch (error) {
    throw new ErrorHandler(error.message, 500);
  }
};

exports.deleteFAQById = async (id) => {
    try {
      const faq = await FAQ.findByIdAndDelete(id); 
      if (!faq) {
        throw new ErrorHandler("FAQ not found", 404);
      }
      return faq;
    } catch (error) {
      throw new ErrorHandler(error.message, 500);
    }
  };

module.exports = {
    getFAQFromCache,
    createFAQ,
    saveFAQToCache
};
  
