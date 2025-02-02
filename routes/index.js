const express = require('express');
const router = express.Router();
const faqRouter = require('./faq.router');

router.use('/faq', faqRouter);

module.exports = router;