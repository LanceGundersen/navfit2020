const INITIAL_STATE = {
  app: {
    isError: false,
    errorObj: "",
    errorMsg: "",
  },
  defaults: {
    ranks: {
      enlisted: [
        "E-1",
        "E-2",
        "E-3",
        "E-4",
        "E-5",
        "E-6",
        "E-7",
        "E-8",
        "E-9",
      ],
      officer: [
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
    },
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
      "Detachment of Reporting Senior",
      "Special",
    ],
    reportTypes: [
      "Regular",
      "Concurrent",
      "Ops Cdr",
    ],
    fonts: ["10 Point", "12 Point"],
    traits: {
      professionalKnowledge: {
        title: "Professional Knowledge",
        subtitle: "Technical knowledge and practical application.",
        standards: [
          {
            value: "0",
            label: "Not Observed",
            notes: [],
          },
          {
            value: "1.0",
            label: "1.0 | Below Standards",
            notes: [
              "Marginal knowledge of rating, specialty or job.",
              "Unable to apply knowledge to solve routine problems.",
              "Fails to meet advancement/PQS requirements.",
            ],
          },
          {
            value: "2.0",
            label: "2.0 | Progressing",
            notes: [],
          },
          {
            value: "3.0",
            label: "3.0 | Meets Standards",
            notes: [
              "Strong working knowledge of rating, specialty and job.",
              "Reliably applies knowledge to accomplish tasks.",
              "Meets advancement/PQS requirements on time.",
            ],
          },
          {
            value: "4.0",
            label: "4.0 | Above Standards",
            notes: [],
          },
          {
            value: "5.0",
            label: "5.0 | Greatly Exceeds Standards",
            notes: [
              "Recognized expert, sought out by all for technical knowledge.",
              "Uses knowledge to solve complex technical problems.",
              "Meets advancement/PQS requirements early/with distinction.",
            ],
          },
        ],
      },
      qualityOfWork: {
        title: "Quality of Work",
        subtitle: "Standard of work; value of end product.",
        standards:
          [
            {
              value: "0",
              label: "Not Observed",
              notes: [],
            },
            {
              value: "1.0",
              label: "1.0 | Below Standards",
              notes: [
                "Needs excessive supervision.",
                "Product frequently needs rework.",
                "Wasteful of resources",
              ],
            },
            {
              value: "2.0",
              label: "2.0 | Progressing",
              notes: [],
            },
            {
              value: "3.0",
              label: "3.0 | Meets Standards",
              notes: [
                "Needs little supervision.",
                "Produces quality work. Few errors and resulting rework.",
                "Uses resources efficiently.",
              ],
            },
            {
              value: "4.0",
              label: "4.0 | Above Standards",
              notes: [],
            },
            {
              value: "5.0",
              label: "5.0 | Greatly Exceeds Standards",
              notes: [
                "Needs no supervision.",
                "Always produces exceptional work. No rework required.",
                "Maximizes resources.",
              ],
            },
          ],
      },
      commandClimate: {
        title:
          "Command or Organizational Climate/Equal Opportunity",
        subtitle:
          "Contributing to growth and development, human worth, community.",
        standards:
          [
            {
              value: "0",
              label: "Not Observed",
              notes: [],
            },
            {
              value: "1.0",
              label: "1.0 | Below Standards",
              notes: [
                "Actions counter to Navy's retention/reenlistment goals.",
                "Uninvolved with mentoring or professional development of subordinates.",
                "Actions counter to good order and discipline and negatively affect Command/Organizational climate.",
                "Demonstrates exclusionary behavior. Fails to value differences from cultural diversity.",
              ],
            },
            {
              value: "2.0",
              label: "2.0 | Progressing",
              notes: [],
            },
            {
              value: "3.0",
              label: "3.0 | Meets Standards",
              notes: [
                "Positive leadership supports Navy's increased retention goals. Active in decreasing attrition.",
                "Actions adequately encourage/support subordinates' personal/professional growth.",
                "Demonstrates appreciation for contributions of Navy personnel. Positive influence on Command climate.",
                "Values differences as strengths. Fosters atmosphere of acceptance/inclusion per EO/EEO policy.",
              ],
            },
            {
              value: "4.0",
              label: "4.0 | Above Standards",
              notes: [],
            },
            {
              value: "5.0",
              label: "5.0 | Greatly Exceeds Standards",
              notes: [
                "Measurably contributes to Navy's increased retention and reduced attrition objectives.",
                "Proactive leader/exemplary mentor. Involved in subordinates' personal development leading to professional growth/sustained commitment.",
                "Initiates support programs for military, civilian, and families to achieve exceptional Command and Organizational climate.",
                "The model of achievement. Develops unit cohesion by valuing differences as strengths.",
              ],
            },
          ],
      },
      militaryBearing: {
        title:
          "Military Bearing/Character",
        subtitle:
          "Appearance, conduct, physical fitness, adherence to Navy Core Values.",
        standards:
          [
            {
              value: "0",
              label: "Not Observed",
              notes: [],
            },
            {
              value: "1.0",
              label: "1.0 | Below Standards",
              notes: [
                "Consistently unsatisfactory appearance.",
                "Poor self-control; conduct resulting in disciplinary action.",
                "Unable to meet one or more physical readiness standards.",
                "Fails to live up to one or more Navy Core Values: HONOR, COURAGE, COMMITMENT.",
              ],
            },
            {
              value: "2.0",
              label: "2.0 | Progressing",
              notes: [],
            },
            {
              value: "3.0",
              label: "3.0 | Meets Standards",
              notes: [
                "Excellent personal appearance.",
                "Excellent conduct, conscientiously complies with regulations.",
                "Complies with physical readiness program.",
                "Always lives up to Navy Core Values: HONOR, COURAGE, COMMITMENT.",
              ],
            },
            {
              value: "4.0",
              label: "4.0 | Above Standards",
              notes: [],
            },
            {
              value: "5.0",
              label: "5.0 | Greatly Exceeds Standards",
              notes: [
                "Exemplary personal appearance.",
                "Model of conduct, on and off duty.",
                "A leader in physical readiness.",
                "Exemplifies Navy Core Values: HONOR, COURAGE, COMMITMENT.",
              ],
            },
          ],
      },
      personalInitiative: {
        title:
          "Personal Job Accomplishment/Initiative",
        subtitle:
          "Responsibility, quantity of work.",
        standards:
          [
            {
              value: "0",
              label: "Not Observed",
              notes: [],
            },
            {
              value: "1.0",
              label: "1.0 | Below Standards",
              notes: [
                "Needs prodding to attain qualification or finish job.",
                "Prioritizes poorly.",
                "Avoids responsibility.",
              ],
            },
            {
              value: "2.0",
              label: "2.0 | Progressing",
              notes: [],
            },
            {
              value: "3.0",
              label: "3.0 | Meets Standards",
              notes: [
                "Productive and motivated. Completes tasks and qualifications fully and on time.",
                "Plans/prioritizes effectively.",
                "Reliable, dependable, willingly accepts responsibility.",
              ],
            },
            {
              value: "4.0",
              label: "4.0 | Above Standards",
              notes: [],
            },
            {
              value: "5.0",
              label: "5.0 | Greatly Exceeds Standards",
              notes: [
                "Energetic self-starter. Completes tasks or qualifications early, far better than expected.",
                "Plans/prioritizes wisely and with exceptional foresight.",
                "Seeks extra responsibility and takes on the hardest jobs.",
              ],
            },
          ],
      },
      teamwork: {
        title:
          "Teamwork",
        subtitle:
          "Contributing to team building and team results.",
        standards:
          [
            {
              value: "0",
              label: "Not Observed",
              notes: [],
            },
            {
              value: "1.0",
              label: "1.0 | Below Standards",
              notes: [
                "Creates conflict, unwilling to work with others, puts self above team.",
                "Fails to understand team goals or teamwork techniques.",
                "Does not take direction well.",
              ],
            },
            {
              value: "2.0",
              label: "2.0 | Progressing",
              notes: [],
            },
            {
              value: "3.0",
              label: "3.0 | Meets Standards",
              notes: [
                "Reinforces others' efforts, meets commitments to team.",
                "Understands goals, employs good teamwork techniques.",
                "Accepts and offers team direction.",
              ],
            },
            {
              value: "4.0",
              label: "4.0 | Above Standards",
              notes: [],
            },
            {
              value: "5.0",
              label: "5.0 | Greatly Exceeds Standards",
              notes: [
                "Team builder, inspires cooperation and progress.",
                "Focuses goals and techniques for teams.",
                "The best at accepting and offering team direction.",
              ],
            },
          ],
      },
      leadership: {
        title:
          "Leadership",
        subtitle:
          "Organizing, motivating and developing others to accomplish goals.",
        standards:
          [
            {
              value: "0",
              label: "Not Observed",
              notes: [],
            },
            {
              value: "1.0",
              label: "1.0 | Below Standards",
              notes: [
                "Neglects growth/development or welfare of subordinates.",
                "Fails to organize, creates problems for subordinates.",
                "Does not set or achieve goals relevant to command mission and vision.",
                "Lacks ability to cope with or tolerate stress.",
                "Inadequate communicator.",
                "Tolerates hazards or unsafe practices.",
              ],
            },
            {
              value: "2.0",
              label: "2.0 | Progressing",
              notes: [],
            },
            {
              value: "3.0",
              label: "3.0 | Meets Standards",
              notes: [
                "Effectively stimulates growth/development in subordinates.",
                "Organizes successfully,implementing process improvements and efficiencies.",
                "Sets/achieves useful, realistic goals that support command mission.",
                "Performs well in stressful situations.",
                "Clear, timely communicator.",
                "Ensures safety of personnel and equipment.",
              ],
            },
            {
              value: "4.0",
              label: "4.0 | Above Standards",
              notes: [],
            },
            {
              value: "5.0",
              label: "5.0 | Greatly Exceeds Standards",
              notes: [
                "Inspiring motivator and trainer, subordinates reach highest level of growth and development.",
                "Superb organizer, great foresight, develops process improvements and efficiencies.",
                "Leadership achievements dramatically further command mission and vision.",
                "Perseveres through the toughest challenges and inspires others.",
                "Exceptional communicator.",
                "Makes subordinates safety-conscious, maintains top safety record.",
                "Constantly improves the personal and professional lives of others.",
              ],
            },
          ],
      }
    },
  },
};

export default INITIAL_STATE;
