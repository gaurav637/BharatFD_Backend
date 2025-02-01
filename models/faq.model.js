const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    hi: { question: String, answer: String },
    bn: { question: String, answer: String },
  },
});

//  Method for the schema to get translated text
faqSchema.methods.getTranslatedText = function (lang) {
  const translation = this.translations[lang];
  return {
    question: translation?.question || this.question,
    answer: translation?.answer || this.answer,
  };
};

module.exports = mongoose.model('FAQ', faqSchema);