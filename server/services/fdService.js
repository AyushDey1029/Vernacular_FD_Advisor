/**
 * fdService.js
 * Encapsulates FD-specific logic and responses.
 */

const { getTranslator, formatScript } = require('../utils/translator');

/**
 * Returns response for starting a new FD.
 * @param {string} language 
 * @param {string} scriptType 
 */
function getFDStartFlow(language, scriptType) {
  const t = getTranslator(language);
  const rawText = t("fd_start_flow");
  return formatScript(rawText, scriptType, language);
}

/**
 * Returns general FD explanation.
 * @param {string} language 
 * @param {string} scriptType 
 */
function getFDExplanation(language, scriptType) {
  const t = getTranslator(language);
  const rawText = t("fd_explain");
  return formatScript(rawText, scriptType, language);
}

/**
 * Returns FD interest rate information.
 * @param {string} language 
 * @param {string} scriptType 
 */
function getFDRateInfo(language, scriptType) {
  const t = getTranslator(language);
  const rawText = t("fd_rate_info");
  return formatScript(rawText, scriptType, language);
}

module.exports = {
  getFDStartFlow,
  getFDExplanation,
  getFDRateInfo,
};
