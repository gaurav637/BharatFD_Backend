const translateToLanguage = async (text, targetLang) => {
    try {
      logger.info(`Translating text to '${targetLang}': "${text}"`);
      const response = await translate(text, { to: targetLang });
      logger.info(`Translation successful for '${targetLang}': "${response.text}"`);
      return response.text; // return translated text
    } catch (error) {
      logger.error(`Translation failed for '${targetLang}': ${error.message}`);
      return text; // return the original text if translation fails
    }
};
  
module.exports = { translateToLanguage };