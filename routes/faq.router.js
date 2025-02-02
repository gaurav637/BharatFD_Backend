const express = require('express');
const router = express.Router();
const { getFAQs, createFAQ, deleteFAQ } = require('../controllers/faq.controller');

router.get('/', getFAQs);
router.post('/', createFAQ);
router.delete('/:id', deleteFAQ);

module.exports = router;