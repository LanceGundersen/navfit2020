import { NAVPERS_1616_26_REV11_11 } from "@/store/evalFormFields";

function nameBuilder(sailor) {
  return `${sailor.lastName}, ${sailor.firstName}${sailor.middleInitial ? ", " : ""}${sailor.middleInitial}`;
}

export default function buildEval(sailor, selectedRecord) {
  const evalCopy = { ...NAVPERS_1616_26_REV11_11 };

  // Block 1: Name
  evalCopy["form1[0].Page1[0]._1_Name_Last__First_MI_Suffix[0]"] = nameBuilder(sailor);
  // Block 2: Rate
  if (sailor.rate) {
    evalCopy["form1[0].Page1[0]._2_GradeRate[0]"] = sailor.rate;
  }
  // Block 3: Designation
  if (sailor.designation) {
    evalCopy["form1[0].Page1[0]._3_Desig[0]"] = sailor.designation;
  }
  // Block 4: Members Social Security Number
  if (sailor.ssn) {
    evalCopy["form1[0].Page1[0]._4_SSN[0]"] = sailor.ssn;
  }
  // Block 5: Status
  if (sailor.memberStatus === "ACT") {
    evalCopy["form1[0].Page1[0]._5_Status[0]"] = 1;
  } else if (sailor.memberStatus === "FTS") {
    evalCopy["form1[0].Page1[0]._5_Status[0]"] = 2;
  } else if (sailor.memberStatus === "INACT") {
    evalCopy["form1[0].Page1[0]._5_Status[0]"] = 3;
  } else if (sailor.memberStatus === "AT/ADSW/265") {
    evalCopy["form1[0].Page1[0]._5_Status[0]"] = 4;
  }
  // Block 6: UIC
  if (selectedRecord.command.uic) {
    evalCopy["form1[0].Page1[0]._6_UIC[0]"] = selectedRecord.command.uic;
  }
  // Block 7: Ship/Station
  if (selectedRecord.command.shipStation) {
    evalCopy["form1[0].Page1[0]._7_ShipStation[0]"] = selectedRecord.command.shipStation;
  }
  // Block 8: Promotion Status
  if (selectedRecord.promotionStatus) {
    evalCopy["form1[0].Page1[0]._8_Promotion_Status[0]"] = selectedRecord.promotionStatus;
  }
  // Block 9: Date Reported
  if (sailor.dateReported) {
    evalCopy["form1[0].Page1[0]._9_Date_Reported[0]"] = sailor.dateReported;
  }
  // Blocks 10-13: Occasion for Report
  if (selectedRecord.reportOccasion === "Periodic") {
    evalCopy["form1[0].Page1[0]._10_Periodic[0]"] = 1;
  } else if (selectedRecord.reportOccasion === "Detachment of Individual") {
    evalCopy["form1[0].Page1[0]._11_Detach_ind[0]"] = 1;
  } else if (selectedRecord.reportOccasion === "Promotion/Frocking") {
    evalCopy["form1[0].Page1[0]._12_Detach_Sr[0]"] = 1;
  } else if (selectedRecord.reportOccasion === "Special") {
    evalCopy["form1[0].Page1[0]._13_Special[0]"] = 1;
  }
  // Block 14: Period of Report From
  if (selectedRecord.fromDate) {
    evalCopy["form1[0].Page1[0]._14_PeriodDate_From[0]"] = selectedRecord.fromDate;
  }
  // Block 15: Period of Report To
  if (selectedRecord.toDate) {
    evalCopy["form1[0].Page1[0]._15_PeriodDate_To[0]"] = selectedRecord.toDate;
  }
  // Block 16: Not Observed
  if (selectedRecord.notObserved) {
    evalCopy["form1[0].Page1[0]._16_NOB[0]"] = 1;
  }
  // Blocks 17-18: Type of Report
  if (selectedRecord.reportType === "Regular") {
    evalCopy["form1[0].Page1[0]._17_Report_Regular[0]"] = 1;
  } else if (selectedRecord.reportType === "Concurrent") {
    evalCopy["form1[0].Page1[0]._18_Report_Concurrent[0]"] = 1;
  }
  // Block 20: Physical Readiness
  if (selectedRecord.physicalReadiness) {
    evalCopy["form1[0].Page1[0]._20_Physical_Readiness[0]"] = selectedRecord.physicalReadiness;
  }
  // Block 21: Billet Subcategory
  if (selectedRecord.billetSubcategory) {
    evalCopy["form1[0].Page1[0]._21_Billet[0]"] = selectedRecord.billetSubcategory;
  }
  // Block 22: Reporting Senior Name
  if (selectedRecord.command.lastName || selectedRecord.command.firstName) {
    evalCopy["form1[0].Page1[0]._22_Reporting_Senior_Last__FI_MI[0]"] = nameBuilder(selectedRecord.command);
  }
  // Block 23: Reporting Senior Grade
  if (selectedRecord.command.grade) {
    evalCopy["form1[0].Page1[0]._23_Grade_Rpt_Sr[0]"] = selectedRecord.command.grade;
  }
  // Block 24: Reporting Senior Designation
  if (selectedRecord.command.designation) {
    evalCopy["form1[0].Page1[0]._24_Desig_Rpt_Sr[0]"] = selectedRecord.command.designation;
  }
  // Block 25: Reporting Senior Title
  if (selectedRecord.command.title) {
    evalCopy["form1[0].Page1[0]._25_Title_Rpt_Sr[0]"] = selectedRecord.command.title;
  }
  // Block 26: Reporting Senior UIC
  if (selectedRecord.command.uic) {
    evalCopy["form1[0].Page1[0]._26_UIC_Rpt_Sr[0]"] = selectedRecord.command.uic;
  } else {
    evalCopy["form1[0].Page1[0]._26_UIC_Rpt_Sr[0]"] = sailor.uic;
  }
  // Block 27: Reporting Senior Social Security Number
  if (selectedRecord.command.ssn) {
    evalCopy["form1[0].Page1[0]._27_SSN_Rpt_Sr[0]"] = selectedRecord.command.ssn;
  }
  // Block 28: Command employment and command achievements
  if (selectedRecord.command.commandDescription) {
    evalCopy["form1[0].Page1[0]._28_Command_achievements[0]"] = selectedRecord.command.commandDescription;
  }
  // Block 29 Primary Collateral Abbreviation
  if (selectedRecord.primaryCollateralShort) {
    evalCopy["form1[0].Page1[0]._29_PrimaryCollat_Short[0]"] = selectedRecord.primaryCollateralShort;
  }
  // Block 29 Primary Collateral Long
  if (selectedRecord.primaryCollateral) {
    evalCopy["form1[0].Page1[0]._29_PrimaryCollat[0]"] = selectedRecord.primaryCollateral;
  }
  // TODO: Add Mid Term Couseling Blocks 30-32
  // Block 33: Professional Knowledge
  if (selectedRecord.professionalKnowledge) {
    evalCopy["form1[0].Page1[0]._33_Leadership[0]"] = selectedRecord.professionalKnowledge;
  }
  // Block 34: Quality of Work
  if (selectedRecord.qualityOfWork) {
    evalCopy["form1[0].Page1[0]._34_InstExpertise[0]"] = selectedRecord.qualityOfWork;
  }
  // Block 35: Command or Organizational Climate/Equal Opportunity
  if (selectedRecord.commandClimate) {
    evalCopy["form1[0].Page1[0]._35_Professionalism[0]"] = selectedRecord.commandClimate;
  }
  // Block 36: Military Bearing/Character
  if (selectedRecord.militaryBearing) {
    evalCopy["form1[0].Page1[0]._36_Loyalty[0]"] = selectedRecord.militaryBearing;
  }
  // Block 37: Personal Job Accomplishment/Initiative
  if (selectedRecord.personalInitiative) {
    evalCopy["form1[0].Page1[0]._37_Character[0]"] = selectedRecord.personalInitiative;
  }
  // Block 38: Teamwork
  if (selectedRecord.teamwork) {
    evalCopy["form1[0].Page2[0]._38_Communication[0]"] = selectedRecord.teamwork;
  }
  // Block 39: Leadership
  if (selectedRecord.leadership) {
    evalCopy["form1[0].Page2[0]._39_Heritage[0]"] = selectedRecord.leadership;
  }
  // TODO: Add Trait average Block 40
  // TODO: Add recommendations Block 41
  // Block for Fonts
  if (selectedRecord.fontSize) {
    evalCopy["form1[0].Page2[0].fontsize[0]"] = selectedRecord.fontSize;
  }
  // Block 43: Comments on Performance
  if (selectedRecord.performanceComments) {
    evalCopy["form1[0].Page2[0]._41_Comments_on_Perf[0]"] = selectedRecord.performanceComments;
  }
  // Block 44: Qualifications/Achievements
  if (selectedRecord.qualificationComments) {
    evalCopy["form1[0].Page2[0]._44Qualifications[0]"] = selectedRecord.qualificationComments;
  }
  // Block 45: Promotion Recommendation
  if (selectedRecord.promotionRecommendation === "NOB") {
    evalCopy["form1[0].Page2[0]._42_Recommendation[0]"] = 0;
  } else if (selectedRecord.promotionRecommendation === "Significant Problems") {
    evalCopy["form1[0].Page2[0]._42_Recommendation[0]"] = 1;
  } else if (selectedRecord.promotionRecommendation === "Progressing") {
    evalCopy["form1[0].Page2[0]._42_Recommendation[0]"] = 2;
  } else if (selectedRecord.promotionRecommendation === "Promotable") {
    evalCopy["form1[0].Page2[0]._42_Recommendation[0]"] = 3;
  } else if (selectedRecord.promotionRecommendation === "Must Promote") {
    evalCopy["form1[0].Page2[0]._42_Recommendation[0]"] = 4;
  } else if (selectedRecord.promotionRecommendation === "Early Promote") {
    evalCopy["form1[0].Page2[0]._42_Recommendation[0]"] = 5;
  }
  // TODO: Add summary values Block 46: Summary
  // Block 47: Recommendation
  if (selectedRecord.retention) {
    selectedRecord.retention ? evalCopy["form1[0].Page2[0]._47_No_Submit[0]"] = 1 : evalCopy["form1[0].Page2[0]._47_Submit[0]"] = 1;
  }
  // Block 48: Reporting Senior Address
  if (selectedRecord.command.address) {
    evalCopy["form1[0].Page2[0]._44_Rpt_Sr_Address[0]"] = selectedRecord.command.address;
  }
  // TODO: Add Group Summary
  return evalCopy;
}

export function exportEval(sailor, recordId) {
  const selectedRecord = sailor.records.find(record => record.id === recordId);
  return buildEval(sailor, selectedRecord);
}
