const faqService = require("../services/faq.service");
const ErrorHandler = require("../utils/errorHandler");
const logger = require("../utils/logger");

const getFAQs = async (req, res) => {
    try {
        const { lang } = req.query;
        const faqs = await faqService.getFAQFromCache(lang);
        
        return res.status(200).json({
            success: true,
            data: faqs
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createFAQ = async (req, res) => {
    try {
        const { question, answer, lang = 'en' } = req.body;
        
        if (!question || !answer) {
            return res.status(400).json({
                success: false,
                message: "Question and answer are required"
            });
        }

        const faq = await faqService.createFAQ(question, answer, lang);
        
        return res.status(201).json({
            success: true,
            data: faq
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await faqService.deleteFAQById(id);
        
        if (!faq) {
            return res.status(404).json({
                success: false,
                message: "FAQ not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: `Faq ${id} Deleted.`,
            data: faq
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

const getFAQ = async (req, res, next) => {
    try {
        logger.log("getfaq");
        const lang = req.query.lang || "en";
        // First, check if the FAQ is in cache
        const cachedData = await faqService.getFAQFromCache(lang);
        if (cachedData && cachedData != 3600) {
            return res.status(200).json({
                success: true,
                data: cachedData,
            });
        }

        // If not in cache, fetch from database
        const faqs = await faqService.getAllFAQs();
        const translatedFaqs = faqs.map((faq) => faq.getTranslatedContent(lang));
        // Save the translated FAQs to cache for future requests
        const data = await faqService.saveFAQToCache(lang, translatedFaqs);
        return res.status(200).json({
            success: true,
            data: translatedFaqs,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getFAQs,
    createFAQ,
    deleteFAQ,
    getFAQ
};
