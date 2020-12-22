/**
 * Evaluation Types Enum
 * @type {{CHIEF: number, ENLISTED: number}}
 */

export const evalType = {
  ENLISTED: 1,
  CHIEF: 2,
}

/**
 * Name Builder
 *
 * If no middle initial, returns only lastName & firstName
 *
 * @param {sailor} sailor object
 * @returns {string} lastName, FirstName, MiddleInitial
 */

export function nameBuilder(sailor) {
  return `${sailor.lastName}, ${sailor.firstName}${sailor.middleInitial ? ", " : ""}${sailor.middleInitial}`;
}

/**
 * Members Current Status Check
 *
 * @param {string} memberStatus (ACT, FTS, INACT, OR AT/ADSW/265)
 * @returns {string} Number 1-4
 */

export function getMemberStatus(memberStatus) {
  if (memberStatus === "ACT") {
    return "1";
  } if (memberStatus === "FTS") {
    return "2";
  } if (memberStatus === "INACT") {
    return "3";
  } if (memberStatus === "AT/ADSW/265") {
    return "4";
  }
  return "";
}

/**
 * Promotion Status Check
 *
 * @param promotionRecommendation (NOB, Significant Problems, Progressing, Promotable, Must Promote OR Early Promote)
 * @returns {string} Number 0-5
 */

export function getPromotionStatus(promotionRecommendation) {
  if (promotionRecommendation === "NOB") {
    return "0";
  } if (promotionRecommendation === "Significant Problems") {
    return "1";
  } if (promotionRecommendation === "Progressing") {
    return "2";
  } if (promotionRecommendation === "Promotable") {
    return "3";
  } if (promotionRecommendation === "Must Promote") {
    return "4";
  } if (promotionRecommendation === "Early Promote") {
    return "5";
  }
  return "";
}
