const mongoose  = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    translations: {
      type: Map,
      of: {
        question: { type: String },
        answer: { type: String },
      },
    },
  },
  { timestamps: true }
);

faqSchema.methods.getTranslatedContent = function (lang) {
  return {
    question: this.translations.get(lang)?.question || this.question,
    answer: this.translations.get(lang)?.answer || this.answer,
  };
};

const FAQ = mongoose.model("FAQ", faqSchema);
module.exports = FAQ;