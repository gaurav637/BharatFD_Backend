const express = require('express');
const router = express.Router();
const { faqController } = require('../controllers/faq.controller.js');

router.get(
    '/', 
    faqController.getFAQs
);
router.post(
    '/', 
    faqController.createFAQ
);

module.exports = router;