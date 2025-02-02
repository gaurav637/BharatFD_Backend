const express = require('express');
const router = express.Router();
const faqController = require("../controllers/faq.controller");

router.get(
    '/fetch', 
    faqController.getFAQ
);
router.post(
    '/create', 
    faqController.createFAQ
);

router.delete(
    '/delete/:id',
    faqController.deleteFAQ
)
module.exports = router;