import { PDFDocument } from "pdf-lib";
import { app } from "electron";
import { writeToLogFile } from "@/services/writeToLogFile";

const fs = require("fs");

const sourcePDF = `${app.getPath("documents")}/navfit2020/NAVPERS_1616-26_Rev11-11.pdf`;

function nameBuilder(sailor) {
  return `${sailor.lastName}, ${sailor.firstName}${sailor.middleInitial ? ", " : ""}${sailor.middleInitial}`;
}

function getMemberStatus(memberStatus) {
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

function getPromotionStatus(promotionRecommendation) {
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

async function buildEval(sailor, selectedRecord, filePath) {
  const formPdfBytes = fs.readFileSync(sourcePDF);
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const form = pdfDoc.getForm();

  // Block 1: Name
  const nameField = form.getField("form1[0].Page1[0]._1_Name_Last__First_MI_Suffix[0]");
  // Block 2: Rate
  const rateField = form.getTextField("form1[0].Page1[0]._2_GradeRate[0]");
  // Block 3: Designation
  const designationField = form.getTextField("form1[0].Page1[0]._3_Desig[0]");
  // Block 4: Members Social Security Number
  const sailorSsnField = form.getTextField("form1[0].Page1[0]._4_SSN[0]");
  // Block 5: Status
  const statusRadioGroup = form.getRadioGroup("form1[0].Page1[0]._5_Status[0]");
  // Block 6: UIC
  const uicField = form.getTextField("form1[0].Page1[0]._6_UIC[0]");
  // Block 7: Ship/Station
  const shipStationField = form.getTextField("form1[0].Page1[0]._7_ShipStation[0]");
  // Block 8: Promotion Status
  const promotionStatusDropdown = form.getDropdown("form1[0].Page1[0]._8_Promotion_Status[0]");
  // Block 9: Date Reported
  const dateReportedField = form.getTextField("form1[0].Page1[0]._9_Date_Reported[0]");
  // Blocks 10: Occasion for Report Periodic
  const periodicCheckbox = form.getCheckBox("form1[0].Page1[0]._10_Periodic[0]");
  // Blocks 11: Occasion for Report Detachment of Individual
  const detachmentIndividualCheckbox = form.getCheckBox("form1[0].Page1[0]._11_Detach_ind[0]");
  // Blocks 12: Occasion for Report Detachment of Senior
  const detachmentSeniorCheckbox = form.getCheckBox("form1[0].Page1[0]._12_Detach_Sr[0]");
  // Blocks 13: Occasion for Report Special Occasion
  const specialCheckbox = form.getCheckBox("form1[0].Page1[0]._13_Special[0]");
  // Block 14: Period of Report From
  const periodFromField = form.getTextField("form1[0].Page1[0]._14_PeriodDate_From[0]");
  // Block 15: Period of Report To
  const periodToField = form.getTextField("form1[0].Page1[0]._15_PeriodDate_To[0]");
  // Block 16: Not Observed
  const notObservedCheckbox = form.getCheckBox("form1[0].Page1[0]._16_NOB[0]");
  // Blocks 17: Type of Report Regular
  const typeOfReportRegularCheckbox = form.getCheckBox("form1[0].Page1[0]._17_Report_Regular[0]");
  // Blocks 17: Type of Report Regular
  const typeOfReportConcurrentCheckbox = form.getCheckBox("form1[0].Page1[0]._18_Report_Concurrent[0]");
  // Block 20: Physical Readiness
  const physicalRedinessField = form.getTextField("form1[0].Page1[0]._20_Physical_Readiness[0]");
  // Block 21: Billet Subcategory
  // TODO: Fix this
  // const billetDropdown = form.getDropdown("form1[0].Page1[0]._21_Billet[0]");
  // Block 22: Reporting Senior Name
  const reportingSeniorNameField = form.getTextField("form1[0].Page1[0]._22_Reporting_Senior_Last__FI_MI[0]");
  // Block 23: Reporting Senior Grade
  const reportingSeniorGradeField = form.getTextField("form1[0].Page1[0]._23_Grade_Rpt_Sr[0]");
  // Block 24: Reporting Senior Designation
  const reportingSeniorDesignationField = form.getTextField("form1[0].Page1[0]._24_Desig_Rpt_Sr[0]");
  // Block 25: Reporting Senior Title
  const reportingSeniorTitleField = form.getTextField("form1[0].Page1[0]._25_Title_Rpt_Sr[0]");
  // Block 26: Reporting Senior UIC
  const reportingSeniorUicField = form.getTextField("form1[0].Page1[0]._26_UIC_Rpt_Sr[0]");
  // Block 27: Reporting Senior Social Security Number
  const reportingSeniorSsnField = form.getTextField("form1[0].Page1[0]._27_SSN_Rpt_Sr[0]");
  // Block 28: Command employment and command achievements
  const commandDescriptionField = form.getTextField("form1[0].Page1[0]._28_Command_achievements[0]");
  // Block 29 Primary Collateral Abbreviation
  const primaryCollateralAbbrField = form.getTextField("form1[0].Page1[0]._29_PrimaryCollat_Short[0]");
  // Block 29 Primary Collateral Long
  const primaryCollateralLongField = form.getTextField("form1[0].Page1[0]._29_PrimaryCollat[0]");
  // TODO: Add Mid Term Couseling Blocks 30-32
  // Block 33: Professional Knowledge
  const professionalKnowledgeRadioGroup = form.getRadioGroup("form1[0].Page1[0]._33_Leadership[0]");
  // Block 34: Quality of Work
  const qualityOfWorkRadioGroup = form.getRadioGroup("form1[0].Page1[0]._34_InstExpertise[0]");
  // Block 35: Command or Organizational Climate/Equal Opportunity
  const commandClimateRadioGroup = form.getRadioGroup("form1[0].Page1[0]._35_Professionalism[0]");
  // Block 36: Military Bearing/Character
  const militaryBearingRadioGroup = form.getRadioGroup("form1[0].Page1[0]._36_Loyalty[0]");
  // Block 37: Personal Job Accomplishment/Initiative
  const personalInitiativeRadioGroup = form.getRadioGroup("form1[0].Page1[0]._37_Character[0]");
  // Block 38: Teamwork
  const teamworkRadioGroup = form.getRadioGroup("form1[0].Page2[0]._38_Communication[0]");
  // Block 39: Leadership
  const leadershipRadioGroup = form.getRadioGroup("form1[0].Page2[0]._39_Heritage[0]");
  // TODO: Add Trait average Block 40
  // TODO: Add recommendations Block 41
  // Block for Fonts
  const fontSizeDropdown = form.getDropdown("form1[0].Page2[0].fontsize[0]");
  // Block 43: Comments on Performance
  const performanceCommentsField = form.getTextField("form1[0].Page2[0]._41_Comments_on_Perf[0]");
  // Block 44: Qualifications/Achievements
  const qualificationCommentsField = form.getTextField("form1[0].Page2[0]._44Qualifications[0]");
  // Block 45: Promotion Recommendation
  const promotionRecommendationRadioGroup = form.getRadioGroup("form1[0].Page2[0]._42_Recommendation[0]");
  // TODO: Add summary values Block 46: Summary
  // Block 47: Recommendation
  const notRecommendedCheckbox = form.getCheckBox("form1[0].Page2[0]._47_No_Submit[0]");
  const recommendedCheckbox = form.getCheckBox("form1[0].Page2[0]._47_Submit[0]");
  // Block 48: Reporting Senior Address
  const reportingSeniorAddressField = form.getTextField("form1[0].Page2[0]._44_Rpt_Sr_Address[0]");
  // TODO: Add Group Summary

  // Block 1: Name
  nameField.setText(nameBuilder(sailor));
  // Block 2: Rate
  rateField.setText(sailor.rate);
  // Block 3: Designation
  designationField.setText(sailor.designation);
  // Block 4: Members Social Security Number
  sailorSsnField.setText(sailor.ssn);
  // Block 5: Status
  statusRadioGroup.select(getMemberStatus(sailor.memberStatus));
  // Block 6: UIC
  uicField.setText(selectedRecord.command.uic);
  // Block 7: Ship/Station
  shipStationField.setText(selectedRecord.command.shipStation);
  // Block 8: Promotion Status
  promotionStatusDropdown.select(selectedRecord.promotionStatus);
  // Block 9: Date Reported
  dateReportedField.setText(sailor.dateReported);
  // TODO: Fix these in the frontend form
  // Blocks 10-23: Occasion for Report
  if (selectedRecord.reportOccasion === "Periodic") {
    periodicCheckbox.check();
  } else if (selectedRecord.reportOccasion === "Detachment of Individual") {
    detachmentIndividualCheckbox.check();
  } else if (selectedRecord.reportOccasion === "Promotion/Frocking") {
    detachmentSeniorCheckbox.check();
  } else if (selectedRecord.reportOccasion === "Special") {
    specialCheckbox.check();
  }
  // Block 14: Period of Report From
  periodFromField.setText(selectedRecord.fromDate);
  // Block 15: Period of Report To
  periodToField.setText(selectedRecord.toDate);
  // Block 16: Not Observed
  if (selectedRecord.notObserved) {
    notObservedCheckbox.check();
  }
  // Blocks 17-18: Type of Report
  if (selectedRecord.reportType === "Regular") {
    typeOfReportRegularCheckbox.check();
  } else if (selectedRecord.reportType === "Concurrent") {
    typeOfReportConcurrentCheckbox.check();
  }
  // Block 20: Physical Readiness
  physicalRedinessField.setText(selectedRecord.physicalReadiness);
  // Block 21: Billet Subcategory
  // TODO: Fix this
  // billetDropdown.select(getMemberStatus(selectedRecord.billetSubcategory));
  // Block 22: Reporting Senior Name
  if (selectedRecord.command.lastName || selectedRecord.command.firstName) {
    reportingSeniorNameField.setText(nameBuilder(selectedRecord.command));
  }
  // Block 23: Reporting Senior Grade
  reportingSeniorGradeField.setText(selectedRecord.command.grade);
  // Block 24: Reporting Senior Designation
  reportingSeniorDesignationField.setText(selectedRecord.command.designation);
  // Block 25: Reporting Senior Title
  reportingSeniorTitleField.setText(selectedRecord.command.title);
  // Block 26: Reporting Senior UIC
  if (selectedRecord.command.uic) {
    reportingSeniorUicField.setText(selectedRecord.command.uic);
  } else {
    reportingSeniorUicField.setText(sailor.uic);
  }
  // Block 27: Reporting Senior Social Security Number
  reportingSeniorSsnField.setText(selectedRecord.command.ssn);
  // Block 28: Command employment and command achievements
  commandDescriptionField.setText(selectedRecord.command.commandDescription);
  // Block 29 Primary Collateral Abbreviation
  primaryCollateralAbbrField.setText(selectedRecord.primaryCollateralShort);
  // Block 29 Primary Collateral Long
  primaryCollateralLongField.setText(selectedRecord.primaryCollateral);
  // TODO: Add Mid Term Couseling Blocks 30-32
  // Block 33: Professional Knowledge
  professionalKnowledgeRadioGroup.select(selectedRecord.professionalKnowledge);
  // Block 34: Quality of Work
  qualityOfWorkRadioGroup.select(selectedRecord.qualityOfWork);
  // Block 35: Command or Organizational Climate/Equal Opportunity
  commandClimateRadioGroup.select(selectedRecord.commandClimate);
  // Block 36: Military Bearing/Character
  militaryBearingRadioGroup.select(selectedRecord.militaryBearing);
  // Block 37: Personal Job Accomplishment/Initiative
  personalInitiativeRadioGroup.select(selectedRecord.personalInitiative);
  // Block 38: Teamwork
  teamworkRadioGroup.select(selectedRecord.teamwork);
  // Block 39: Leadership
  leadershipRadioGroup.select(selectedRecord.leadership);
  // TODO: Add Trait average Block 40
  // TODO: Add recommendations Block 41
  // Block for Fonts
  fontSizeDropdown.select(selectedRecord.fontSize);
  // Block 43: Comments on Performance
  performanceCommentsField.setText(selectedRecord.performanceComments);
  // Block 44: Qualifications/Achievements
  qualificationCommentsField.setText(selectedRecord.qualificationComments);
  // Block 45: Promotion Recommendation
  promotionRecommendationRadioGroup.select(getPromotionStatus(selectedRecord.promotionRecommendation));
  // TODO: Add summary values Block 46: Summary
  // Block 47: Recommendation
  selectedRecord.retention ? recommendedCheckbox.check() : notRecommendedCheckbox.check();
  // Block 48: Reporting Senior Address
  reportingSeniorAddressField.setText(selectedRecord.command.address);
  // TODO: Add Group Summary

  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync(filePath, pdfBytes);
  await PDFDocument.load(formPdfBytes);
}

export default function exportEval(sailor, recordId, filePath) {
  const selectedRecord = sailor.records.find(record => record.id === recordId);
  try {
    buildEval(sailor, selectedRecord, filePath).then(() => writeToLogFile("Eval exporting complete."));
  } catch (err) {
    window.ipcRenderer.send("eval:export:error", err);
  }
}
