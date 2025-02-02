const faqService  = require("../services/faq.service");
const ErrorHandler = require("../utils/errorHandler");


exports.getFAQ = async (req, res, next) => {
  try {
    const lang = req.query.lang || "en";
    // First, check if the FAQ is in cache
    const cachedData = await faqService.getFAQFromCache(lang);
    if (cachedData && cachedData!=3600) {
      return res.status(200).json({
        success: true,
        data: cachedData,
      });
    }

    // If not in cache, fetch from database
    const faqs = await faqService.getAllFAQs();
    const translatedFaqs = faqs.map((faq) => faq.getTranslatedContent(lang));
    // Save the translated FAQs to cache for future requests
    const data =  await faqService.saveFAQToCache(lang, translatedFaqs);
    return res.status(200).json({
      success: true,
      data: translatedFaqs,
    });
  } catch (error) {
    return next(error); // Let the error handler catch the error
  }
};

exports.createFAQ = async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return next(new ErrorHandler("Question and answer are required", 400));
    }
    const targetLang = req.query.lang || "en";
    const faq = await faqService.createFAQ(question, answer, targetLang);
    return res.status(201).json({
      success: true,
      message: `FAQ ${faq._id} Created:`,
      data: faq,
    });
  } catch (error) {
    return next(error); // Let the error handler catch the error
  }
};

exports.deleteFAQ = async (req, res, next) => {
  try {
    const { id } = req.params;
    const faq = await faqService.deleteFAQById(id);
    return res.status(200).json({
      success: true,
      message: `Faq ${id}  Deleted.`,
      data: faq
    });
  } catch (error) {
    return next(error); // Let the error handler catch the error
  }
};
