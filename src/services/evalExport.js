import { showDialog } from "@/background";
import buildEnlisted from "@/services/builder/enlisted";
import buildChief from "@/services/builder/chief";
import {evalType} from "@/utils/evalBuilder";


async function buildEval(sailor, selectedRecord, filePath, type) {
  switch (type) {
    case evalType.ENLISTED:
      return buildEnlisted(sailor, selectedRecord, filePath);
    case evalType.CHIEF:
      return buildChief(sailor, selectedRecord, filePath);
    default:
      return null;
  }
}

export default function exportEval(sailor, recordId, filePath) {
  const selectedRecord = sailor.records.find(record => record.id === recordId);
  buildEval(sailor, selectedRecord, filePath, sailor.rank.type).then(error => {
    if (error) {
      showDialog(
        "error",
        "Eval Export",
        "There was an error exporting the evaluation. If you are unable to figure the issue out, please copy the error output below and submit as a bug.",
        filePath,
        error
      );
    } else {
      showDialog(
        "success",
        "Eval Export",
        "The evaluation was successfully exported to:",
        filePath
      );
    }
  });
}
