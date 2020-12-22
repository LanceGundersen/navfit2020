import { app } from "electron";
import { PDFDocument } from "pdf-lib";
import { nameBuilder } from "@/utils/evalBuilder";
import { CHIEF_EVAL_FIELDS } from "@/store/evalFormFields";

const fs = require("fs");
const sourcePDF = `${app.getPath("documents")}/navfit2020/NAVPERS_1616-27_Rev08-10-Decrpyt.pdf`;

export default async function buildChief(sailor, selectedRecord, filePath) {
  try {
    const formPdfBytes = fs.readFileSync(sourcePDF);
    const pdfDoc = await PDFDocument.load(formPdfBytes, { ignoreEncryption: true });
    const form = pdfDoc.getForm();

    // Block 1: Name
    const nameField = form.getField(CHIEF_EVAL_FIELDS.PG_1_NAME);
    // Block 2: Rate
    const rateField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_GRADE);
    // Block 3: Designation
    const designationField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_DESIG);
    // Block 4: Members Social Security Number
    const sailorSsnField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_SSN);
    // Block 5: Status
    // TODO: Bug. There seems to only be one selection in the options arr >> `[2]`
    // const statusRadioGroup = form.getRadioGroup(CHIEF_EVAL_FIELDS.PG_1_STATUS);
    // Block 6: UIC
    const uicField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_UIC);
    // Block 7: Ship/Station
    const shipStationField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_SHIP_STATION);
    // Block 8: Promotion Status
    const promotionStatusDropdown = form.getDropdown(CHIEF_EVAL_FIELDS.PG_1_PROMOTION_STATUS);
    // Block 9: Date Reported
    const dateReportedField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_DATE_REPORTED);
    // Blocks 10: Occasion for Report Periodic
    const periodicCheckbox = form.getCheckBox(CHIEF_EVAL_FIELDS.PG_1_PERIODIC);
    // Blocks 11: Occasion for Report Detachment of Individual
    const detachmentIndividualCheckbox = form.getCheckBox(CHIEF_EVAL_FIELDS.PG_1_DETACH_INDIVIDUAL);
    // Blocks 12: Occasion for Report Detachment of Senior
    const detachmentSeniorCheckbox = form.getCheckBox(CHIEF_EVAL_FIELDS.PG_1_DETACH_SENIOR);
    // Blocks 13: Occasion for Report Special Occasion
    const specialCheckbox = form.getCheckBox(CHIEF_EVAL_FIELDS.PG_1_SPECIAL);
    // Block 14: Period of Report From
    const periodFromField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_DATE_FROM);
    // Block 15: Period of Report To
    const periodToField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_DATE_TO);
    // Block 16: Not Observed
    const notObservedCheckbox = form.getCheckBox(CHIEF_EVAL_FIELDS.PG_1_NOB);
    // Blocks 17: Type of Report Regular
    const typeOfReportRegularCheckbox = form.getCheckBox(CHIEF_EVAL_FIELDS.PG_1_REGULAR);
    // Blocks 17: Type of Report Regular
    const typeOfReportConcurrentCheckbox = form.getCheckBox(CHIEF_EVAL_FIELDS.PG_1_CONCURRENT);
    // Blocks 19: Type of Report OpsCDR
    const typeOfReportOpsCDRCheckbox = form.getCheckBox(CHIEF_EVAL_FIELDS.PG_1_OPS_CDR);
    // Block 20: Physical Readiness
    const physicalRedinessField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_PHYSICAL_READINESS);
    // Block 21: Billet Subcategory
    // TODO: Fix this
    // const billetDropdown = form.getDropdown("form1[0].Page1[0]._21_Billet[0]");
    // Block 22: Reporting Senior Name
    const reportingSeniorNameField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_REPORTING_SENIOR_NAME);
    // Block 23: Reporting Senior Grade
    const reportingSeniorGradeField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_REPORTING_SENIOR_GRADE);
    // Block 24: Reporting Senior Designation
    const reportingSeniorDesignationField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_DESIG);
    // Block 25: Reporting Senior Title
    const reportingSeniorTitleField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_REPORTING_SENIOR_TITLE);
    // Block 26: Reporting Senior UIC
    const reportingSeniorUicField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_REPORTING_SENIOR_UIC);
    // Block 27: Reporting Senior Social Security Number
    const reportingSeniorSsnField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_REPORTING_SENIOR_SSN);
    // Block 28: Command employment and command achievements
    const commandDescriptionField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_COMMAND_ACHIEVEMENTS);
    // Block 29 Primary Collateral Abbreviation
    const primaryCollateralAbbrField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_COLLATERAL_SHORT);
    // Block 29 Primary Collateral Long
    const primaryCollateralLongField = form.getTextField(CHIEF_EVAL_FIELDS.PG_1_COLLATERAL_LONG);
    // TODO: Add Mid Term Counseling Blocks 30-32
    // Block 33: Professional Knowledge
    const professionalKnowledgeRadioGroup = form.getRadioGroup(CHIEF_EVAL_FIELDS.PG_1_LEADERSHIP);
    // Block 34: Quality of Work
    const qualityOfWorkRadioGroup = form.getRadioGroup(CHIEF_EVAL_FIELDS.PG_1_EXPERTISE);
    // Block 35: Command or Organizational Climate/Equal Opportunity
    const commandClimateRadioGroup = form.getRadioGroup(CHIEF_EVAL_FIELDS.PG_1_PROFESSIONALISM);
    // Block 36: Military Bearing/Character
    const militaryBearingRadioGroup = form.getRadioGroup(CHIEF_EVAL_FIELDS.PG_1_LOYALTY);
    // Block 37: Personal Job Accomplishment/Initiative
    const personalInitiativeRadioGroup = form.getRadioGroup(CHIEF_EVAL_FIELDS.PG_2_CHARACTER);
    // Block 38: Teamwork
    const teamworkRadioGroup = form.getRadioGroup(CHIEF_EVAL_FIELDS.PG_2_COMMUNICATION);
    // Block 39: Leadership
    const leadershipRadioGroup = form.getRadioGroup(CHIEF_EVAL_FIELDS.PG_2_HERITAGE);
    // Block 40: Recommendation 1
    const recommendationOneField = form.getTextField(CHIEF_EVAL_FIELDS.PG_2_RECOMMEND_1);
    // Block 41: Recommendation 2
    const recommendationTwoField = form.getTextField(CHIEF_EVAL_FIELDS.PG_2_RECOMMEND_2);
    // Block for Fonts
    const fontSizeDropdown = form.getDropdown(CHIEF_EVAL_FIELDS.PG_2_FONT_SIZE);
    // Block 43: Comments on Performance
    const performanceCommentsField = form.getTextField(CHIEF_EVAL_FIELDS.PG_2_PERFORMANCE_COMMENTS);
    // TODO: Add summary values Block 46: Summary
    // Block 44: Reporting Senior Address
    const reportingSeniorAddressField = form.getTextField(CHIEF_EVAL_FIELDS.PG_2_REPORTING_SENIOR_ADDRESS);
    // TODO: Add Group Summary
    // TODO: Member Trait Average

    // Block 1: Name
    nameField.setText(nameBuilder(sailor));
    // Block 2: Rate
    rateField.setText(sailor.rate);
    // Block 3: Designation
    designationField.setText(sailor.designation);
    // Block 4: Members Social Security Number
    sailorSsnField.setText(sailor.ssn);
    // Block 5: Status
    // TODO: Bug. There seems to only be one selection in the options arr >> `[2]`
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
    // Blocks 17-19: Type of Report
    if (selectedRecord.reportType === "Regular") {
      typeOfReportRegularCheckbox.check();
    }
    if (selectedRecord.reportType === "Concurrent") {
      typeOfReportConcurrentCheckbox.check();
    }
    if (selectedRecord.reportType === "Ops Cdr") {
      typeOfReportOpsCDRCheckbox.check();
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
    // Block 33: Deckplate Leader
    professionalKnowledgeRadioGroup.select(selectedRecord.deckplateLeader);
    // Block 34: Technical Expertise
    qualityOfWorkRadioGroup.select(selectedRecord.technicalExpertise);
    // Block 35: Professionalism
    commandClimateRadioGroup.select(selectedRecord.professionalism);
    // Block 36: Loyalty
    militaryBearingRadioGroup.select(selectedRecord.loyalty);
    // Block 37: Character
    personalInitiativeRadioGroup.select(selectedRecord.character);
    // Block 38: Active Communication
    teamworkRadioGroup.select(selectedRecord.activeCommunication);
    // Block 39: Heritage
    leadershipRadioGroup.select(selectedRecord.heritage);
    // Block 40: Recommendation 1
    recommendationOneField.setText(selectedRecord.recommendationOne);
    // Block 41: Recommendation 2
    recommendationTwoField.setText(selectedRecord.recommendationTwo);
    // Block for Fonts
    fontSizeDropdown.select(selectedRecord.fontSize);
    // Block 43: Comments on Performance
    performanceCommentsField.setText(selectedRecord.performanceComments);
    // TODO: Add summary values Block 46: Summary
    // Block 44: Reporting Senior Address
    reportingSeniorAddressField.setText(selectedRecord.command.address);
    // TODO: Add Group Summary

    const pdfBytes = await pdfDoc.save({updateFieldAppearances: false});
    fs.writeFileSync(filePath, pdfBytes);
    await PDFDocument.load(formPdfBytes);
  } catch (error) {
    return error;
  }
}
