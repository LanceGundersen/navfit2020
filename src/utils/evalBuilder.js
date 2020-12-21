export const evalType = {
  ENLISTED: 1,
  CHIEF: 2,
}

export function nameBuilder(sailor) {
  return `${sailor.lastName}, ${sailor.firstName}${sailor.middleInitial ? ", " : ""}${sailor.middleInitial}`;
}

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
