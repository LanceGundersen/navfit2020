import { app } from "electron";
import { PDFDocument } from "pdf-lib";

const fs = require("fs");
import { getPromotionStatus, nameBuilder } from "@/utils/evalBuilder";
import { ENLISTED_EVAL_FIELDS } from "@/services/evalFormFields";
const sourcePDF = `${app.getPath("documents")}/navfit2020/NAVPERS_1616-26_Rev11-11.pdf`;

export default async function buildEnlisted(sailor, selectedRecord, filePath) {
  try {
    const formPdfBytes = fs.readFileSync(sourcePDF);
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const form = pdfDoc.getForm();

    // Block 1: Name
    const nameField = form.getField(ENLISTED_EVAL_FIELDS.PG_1_NAME);
    // Block 2: Rate
    const rateField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_RATE);
    // Block 3: Designation
    const designationField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_DESIG);
    // Block 4: Members Social Security Number
    const sailorSsnField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_SSN);
    // Page 2: Name
    const name2Field = form.getField(ENLISTED_EVAL_FIELDS.PG_2_NAME);
    // Page 2: Rate
    const rate2Field = form.getTextField(ENLISTED_EVAL_FIELDS.PG_2_GRADE);
    // Page 2:  Designation
    const designation2Field = form.getTextField(ENLISTED_EVAL_FIELDS.PG_2_DESIG);
    // Page 2:  Members Social Security Number
    const sailorSsn2Field = form.getTextField(ENLISTED_EVAL_FIELDS.PG_2_SSN);
    // Block 5: Status
    // TODO: Bug. There seems to be an error with the mapping
    // const statusRadioGroup = form.getRadioGroup(ENLISTED_EVAL_FIELDS.PG_1_STATUS);
    // Block 6: UIC
    const uicField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_UIC);
    // Block 7: Ship/Station
    const shipStationField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_SHIP_STATION);
    // Block 8: Promotion Status
    const promotionStatusDropdown = form.getDropdown(ENLISTED_EVAL_FIELDS.PG_1_PROMOTION_STATUS);
    // Block 9: Date Reported
    const dateReportedField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_DATE_REPORTED);
    // Blocks 10: Occasion for Report Periodic
    const periodicCheckbox = form.getCheckBox(ENLISTED_EVAL_FIELDS.PG_1_PERIODIC);
    // Blocks 11: Occasion for Report Detachment of Individual
    const detachmentIndividualCheckbox = form.getCheckBox(ENLISTED_EVAL_FIELDS.PG_1_DETACH_INDIVIDUAL);
    // Blocks 12: Occasion for Report Detachment of Senior
    const detachmentSeniorCheckbox = form.getCheckBox(ENLISTED_EVAL_FIELDS.PG_1_DETACH_SENIOR);
    // Blocks 13: Occasion for Report Special Occasion
    const specialCheckbox = form.getCheckBox(ENLISTED_EVAL_FIELDS.PG_1_SPECIAL);
    // Block 14: Period of Report From
    const periodFromField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_DATE_FROM);
    // Block 15: Period of Report To
    const periodToField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_DATE_TO);
    // Block 16: Not Observed
    const notObservedCheckbox = form.getCheckBox(ENLISTED_EVAL_FIELDS.PG_1_NOB);
    // Blocks 17: Type of Report Regular
    const typeOfReportRegularCheckbox = form.getCheckBox(ENLISTED_EVAL_FIELDS.PG_1_REGULAR);
    // Blocks 17: Type of Report Regular
    const typeOfReportConcurrentCheckbox = form.getCheckBox(ENLISTED_EVAL_FIELDS.PG_1_CONCURRENT);
    // Block 20: Physical Readiness
    const physicalRedinessField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_PHYSICAL_READINESS);
    // Block 21: Billet Subcategory
    // TODO: Fix this
    // const billetDropdown = form.getDropdown(ENLISTED_EVAL_FIELDS.PG_1_BILLET);
    // Block 22: Reporting Senior Name
    const reportingSeniorNameField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_REPORTING_SENIOR_NAME);
    // Block 23: Reporting Senior Grade
    const reportingSeniorGradeField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_REPORTING_SENIOR_GRADE);
    // Block 24: Reporting Senior Designation
    const reportingSeniorDesignationField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_REPORTING_SENIOR_DESIG);
    // Block 25: Reporting Senior Title
    const reportingSeniorTitleField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_REPORTING_SENIOR_TITLE);
    // Block 26: Reporting Senior UIC
    const reportingSeniorUicField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_REPORTING_SENIOR_UIC);
    // Block 27: Reporting Senior Social Security Number
    const reportingSeniorSsnField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_REPORTING_SENIOR_SSN);
    // Block 28: Command employment and command achievements
    const commandDescriptionField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_COMMAND_ACHIEVEMENTS);
    // Block 29 Primary Collateral Abbreviation
    const primaryCollateralAbbrField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_COLLATERAL_SHORT);
    // Block 29 Primary Collateral Long
    const primaryCollateralLongField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_1_COLLATERAL_LONG);
    // TODO: Add Mid Term Couseling Blocks 30-32
    // Block 33: Professional Knowledge
    const professionalKnowledgeRadioGroup = form.getRadioGroup(ENLISTED_EVAL_FIELDS.PG_1_LEADERSHIP);
    // Block 34: Quality of Work
    const qualityOfWorkRadioGroup = form.getRadioGroup(ENLISTED_EVAL_FIELDS.PG_1_EXPERTISE);
    // Block 35: Command or Organizational Climate/Equal Opportunity
    const commandClimateRadioGroup = form.getRadioGroup(ENLISTED_EVAL_FIELDS.PG_1_PROFESSIONALISM);
    // Block 36: Military Bearing/Character
    const militaryBearingRadioGroup = form.getRadioGroup(ENLISTED_EVAL_FIELDS.PG_1_LOYALTY);
    // Block 37: Personal Job Accomplishment/Initiative
    const personalInitiativeRadioGroup = form.getRadioGroup(ENLISTED_EVAL_FIELDS.PG_1_CHARACTER);
    // Block 38: Teamwork
    const teamworkRadioGroup = form.getRadioGroup(ENLISTED_EVAL_FIELDS.PG_2_COMMUNICATION);
    // Block 39: Leadership
    const leadershipRadioGroup = form.getRadioGroup(ENLISTED_EVAL_FIELDS.PG_2_HERITAGE);
    // TODO: Add Trait average Block 40
    // TODO: Add recommendations Block 41
    // Block for Fonts
    const fontSizeDropdown = form.getDropdown(ENLISTED_EVAL_FIELDS.PG_2_FONT_SIZE);
    // Block 43: Comments on Performance
    const performanceCommentsField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_2_PERFORMANCE_COMMENTS);
    // Block 44: Qualifications/Achievements
    const qualificationCommentsField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_2_QUALIFICATIONS);
    // Block 45: Promotion Recommendation
    const promotionRecommendationRadioGroup = form.getRadioGroup(ENLISTED_EVAL_FIELDS.PG_2_RECOMMENDATION);
    // TODO: Add summary values Block 46: Summary
    // Block 47: Recommendation
    const notRecommendedCheckbox = form.getCheckBox(ENLISTED_EVAL_FIELDS.PG_2_SUBMIT_FALSE);
    const recommendedCheckbox = form.getCheckBox(ENLISTED_EVAL_FIELDS.PG_2_SUBMIT_TRUE);
    // Block 48: Reporting Senior Address
    const reportingSeniorAddressField = form.getTextField(ENLISTED_EVAL_FIELDS.PG_2_REPORTING_SENIOR_ADDRESS);
    // TODO: Add Group Summary

    // Block 1: Name
    nameField.setText(nameBuilder(sailor));
    // Block 2: Rate
    rateField.setText(sailor.rate);
    // Block 3: Designation
    designationField.setText(sailor.designation);
    // Block 4: Members Social Security Number
    sailorSsnField.setText(sailor.ssn);
    // Page 2: Name
    name2Field.setText(nameBuilder(sailor));
    // Page 2: Rate
    rate2Field.setText(sailor.rate);
    // Page 2:  Designation
    designation2Field.setText(sailor.designation);
    // Page 2:  Members Social Security Number
    sailorSsn2Field.setText(sailor.ssn);
    // Block 5: Status
    // TODO: Bug. There seems to be an error with the mapping
    // statusRadioGroup.select(getMemberStatus(sailor.memberStatus));
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

    const pdfBytes = await pdfDoc.save({updateFieldAppearances: false});
    fs.writeFileSync(filePath, pdfBytes);
    await PDFDocument.load(formPdfBytes);
  } catch (error) {
    return error;
  }
}
