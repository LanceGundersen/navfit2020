const INITIAL_STATE = {
  defaults: {
    ranks: [
      "E-1",
      "E-2",
      "E-3",
      "E-4",
      "E-5",
      "E-6",
      "E-7",
      "E-8",
      "E-9",
      "W-2",
      "W-3",
      "W-4",
      "W-5",
      "O1-E",
      "O2-E",
      "O-3E",
      "O-1",
      "O-2",
      "O-3",
      "O-4",
      "O-5",
      "O-6",
      "O-7",
      "O-8",
      "O-9",
      "O-10",
      "O-11",
    ],
    memberStatus: [
      "ACT",
      "TAR",
      "INACT",
      "AT/ADSW/265",
    ],
    promotionStatus: [
      "REGULAR",
      "FROCKED",
      "SELECTED",
      "SPOT"
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
      "N/XX"
    ],
    promotionRecommendation: [
      "NOB",
      "Significant Problems",
      "Progressing",
      "Promotable",
      "Must Promote",
      "Early Promote"
    ]
  },
  commandInfo: {
    uic: "",
    shipStation: "",
    commandDescription: "",
    reportingSenior: {
      lastName: "",
      firstName: "",
      middleInitial: "",
      grade: "",
      designation: "",
      title: "",
      reportingSeniorUic: "",
      ssn: "",
      address: ""
    }
  },
  sailors: [],
};

export default INITIAL_STATE;
