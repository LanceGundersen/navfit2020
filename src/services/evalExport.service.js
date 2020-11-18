import { NAVPERS_1616_26_REV11_11 } from "@/store/evalFormFields";

const pdfFiller = window.require("pdffiller");

const sourcePDF = "src/static/NAVPERS_1616-26_Rev11-11.pdf";
const destinationDir = "src/static/";
const shouldFlatten = false;

function buildEval(sailor, selectedRecord) {
  const evalCopy = { ...NAVPERS_1616_26_REV11_11 };

  evalCopy["form1[0].Page1[0]._1_Name_Last__First_MI_Suffix[0]"] = `${sailor.lastName}, ${sailor.firstName}, ${sailor.middleInitial}`;
  evalCopy["form1[0].Page1[0]._2_GradeRate[0]"] = `${sailor.rate}`;
  // evalCopy["form1[0].Page1[0]._3_Desig[0]"] = `${sailor.designation}`;
  evalCopy["form1[0].Page1[0]._4_SSN[0]"] = `${sailor.ssn}`;
  evalCopy["form1[0].Page1[0]._20_Physical_Readiness[0]"] = `${selectedRecord.physicalReadiness}`;
  evalCopy["form1[0].Page2[0]._41_Comments_on_Perf[0]"] = `${selectedRecord.performanceComments}`;
  evalCopy["form1[0].Page2[0]._44Qualifications[0]"] = `${selectedRecord.qualificationsComments}`;

  return evalCopy;
}

export function exportEval({ sailor, recordId }) {
  const selectedRecord = sailor.records.find(record => record.id === recordId);
  const pdfName = `${destinationDir}${sailor.rate}_${sailor.lastName}_${sailor.firstName}_`
  + `${selectedRecord.fromDate}_${selectedRecord.toDate}.pdf`;

  const record = buildEval(sailor, selectedRecord);

  pdfFiller.fillFormWithFlatten(sourcePDF, pdfName, record, shouldFlatten, err => {
    if (err) throw err;
    console.log("In callback (we're done).");
  });
}
