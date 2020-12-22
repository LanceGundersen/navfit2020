import {evalType} from "@/utils/evalBuilder";

const INITIAL_STATE = {
  app: {
    dialog: {
      show: false,
      title: "",
      msg: "",
      error: "",
      path: "",
      type: "info"
    },
  },
  defaults: {
    ranks: [
      {
        display: "E-1",
        type: evalType.ENLISTED,
      },
      {
        display: "E-2",
        type: evalType.ENLISTED,
      },
      {
        display: "E-3",
        type: evalType.ENLISTED,
      },
      {
        display: "E-4",
        type: evalType.ENLISTED,
      },
      {
        display: "E-5",
        type: evalType.ENLISTED,
      },
      {
        display: "E-6",
        type: evalType.ENLISTED,
      },
      {
        display: "E-7",
        type: evalType.CHIEF,
      },
      {
        display: "E-8",
        type: evalType.CHIEF,
      },
      {
        display: "E-9",
        type: evalType.CHIEF,
      },
    ],
    memberStatuses: [
      "ACT",
      "FTS",
      "INACT",
      "AT/ADSW/265",
    ],
    promotionStatuses: [
      "REGULAR",
      "FROCKED",
      "SELECTED",
      "SPOT",
    ],
    physicalReadiness: [
      "P/WS",
      "P/NS",
      "P/MW",
      "P/XX",
      "F/WS",
      "F/NS",
      "F/MW",
      "F/XX",
      "M/WS",
      "M/NS",
      "M/MW",
      "M/XX",
      "N/WS",
      "N/NS",
      "N/MW",
      "N/XX",
    ],
    billetSubcategory: [
      "NA",
      "BASIC",
      "APPROVED",
      "CO AFLOAT",
      "CO ASHORE",
      "OIC",
      "SEA COMP",
      "CRF",
      "CANVASSER",
      "RESIDENT",
      "INDIV AUG",
      "INTERN",
      "INSTRUCTOR",
      "STUDENT",
      "RESAC1",
      "RESAC6",
      "SPECIAL",
    ],
    promotionRecommendations: [
      "NOB",
      "Significant Problems",
      "Progressing",
      "Promotable",
      "Must Promote",
      "Early Promote",
    ],
    reportOccasions: [
      "Periodic",
      "Detachment of Individual",
      "Promotion/Frocking",
      "Special",
    ],
    reportTypes: [
      "NOB",
      "Regular",
      "Concurrent",
      "Ops Cdr",
    ],
    fonts: ["10", "12"],
  },
};

export default INITIAL_STATE;
