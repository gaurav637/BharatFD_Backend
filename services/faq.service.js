const { FAQ } = require("../models");
const redis = require("../config/redis.js");
const translateText  = require("../utils/translation");
const ErrorHandler = require("../utils/errorHandler");

exports.getFAQFromCache = async (lang) => {
  try {
      const cacheKey = `faq:${lang}`;
      let data = await redis.get(cacheKey);
      console.log("Cached data ->", data);  // Debugging: Check stored data
      
      if (!data) return null;
      let faqs = JSON.parse(data);
      // Translate each FAQ's question and answer
      const translatedFaqs = await Promise.all(faqs.map(async (faq) => ({
          question: await translateText(faq.question, lang),
          answer: await translateText(faq.answer, lang)
      })));
      return translatedFaqs;
  } catch (error) {
      throw new ErrorHandler(error.message, 500);
  }
};


exports.createFAQ = async (question, answer, targetLang) => {
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
    throw new ErrorHandler(error.message, 500);
  }
};

exports.saveFAQToCache = async (lang, faqs) => {
  try {
      const cacheKey = `faq:${lang}`;
      const data = JSON.stringify(faqs);
      console.log("data -. ", data);
      await redis.set(cacheKey, data); // Store data
      await redis.expire(cacheKey, 3600); // Set expiration separately
      console.log(`FAQ cached for ${lang} with key ${cacheKey}`); // Debugging
  } catch (error) {
      throw new ErrorHandler(error.message, 500);
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
