export const APP_CONSTANTS = {
  traitsEnlisted: {
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
          value: "1",
          label: "1.0 | Below Standards",
          notes: [
            "Marginal knowledge of rating, specialty or job.",
            "Unable to apply knowledge to solve routine problems.",
            "Fails to meet advancement/PQS requirements.",
          ],
        },
        {
          value: "2",
          label: "2.0 | Progressing",
          notes: [],
        },
        {
          value: "3",
          label: "3.0 | Meets Standards",
          notes: [
            "Strong working knowledge of rating, specialty and job.",
            "Reliably applies knowledge to accomplish tasks.",
            "Meets advancement/PQS requirements on time.",
          ],
        },
        {
          value: "4",
          label: "4.0 | Above Standards",
          notes: [],
        },
        {
          value: "5",
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
            value: "1",
            label: "1.0 | Below Standards",
            notes: [
              "Needs excessive supervision.",
              "Product frequently needs rework.",
              "Wasteful of resources",
            ],
          },
          {
            value: "2",
            label: "2.0 | Progressing",
            notes: [],
          },
          {
            value: "3",
            label: "3.0 | Meets Standards",
            notes: [
              "Needs little supervision.",
              "Produces quality work. Few errors and resulting rework.",
              "Uses resources efficiently.",
            ],
          },
          {
            value: "4",
            label: "4.0 | Above Standards",
            notes: [],
          },
          {
            value: "5",
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
            value: "1",
            label: "1.0 | Below Standards",
            notes: [
              "Actions counter to Navy's retention/reenlistment goals.",
              "Uninvolved with mentoring or professional development of subordinates.",
              "Actions counter to good order and discipline and negatively affect Command/Organizational climate.",
              "Demonstrates exclusionary behavior. Fails to value differences from cultural diversity.",
            ],
          },
          {
            value: "2",
            label: "2.0 | Progressing",
            notes: [],
          },
          {
            value: "3",
            label: "3.0 | Meets Standards",
            notes: [
              "Positive leadership supports Navy's increased retention goals. Active in decreasing attrition.",
              "Actions adequately encourage/support subordinates' personal/professional growth.",
              "Demonstrates appreciation for contributions of Navy personnel. Positive influence on Command climate.",
              "Values differences as strengths. Fosters atmosphere of acceptance/inclusion per EO/EEO policy.",
            ],
          },
          {
            value: "4",
            label: "4.0 | Above Standards",
            notes: [],
          },
          {
            value: "5",
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
            value: "1",
            label: "1.0 | Below Standards",
            notes: [
              "Consistently unsatisfactory appearance.",
              "Poor self-control; conduct resulting in disciplinary action.",
              "Unable to meet one or more physical readiness standards.",
              "Fails to live up to one or more Navy Core Values: HONOR, COURAGE, COMMITMENT.",
            ],
          },
          {
            value: "2",
            label: "2.0 | Progressing",
            notes: [],
          },
          {
            value: "3",
            label: "3.0 | Meets Standards",
            notes: [
              "Excellent personal appearance.",
              "Excellent conduct, conscientiously complies with regulations.",
              "Complies with physical readiness program.",
              "Always lives up to Navy Core Values: HONOR, COURAGE, COMMITMENT.",
            ],
          },
          {
            value: "4",
            label: "4.0 | Above Standards",
            notes: [],
          },
          {
            value: "5",
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
            value: "1",
            label: "1.0 | Below Standards",
            notes: [
              "Needs prodding to attain qualification or finish job.",
              "Prioritizes poorly.",
              "Avoids responsibility.",
            ],
          },
          {
            value: "2",
            label: "2.0 | Progressing",
            notes: [],
          },
          {
            value: "3",
            label: "3.0 | Meets Standards",
            notes: [
              "Productive and motivated. Completes tasks and qualifications fully and on time.",
              "Plans/prioritizes effectively.",
              "Reliable, dependable, willingly accepts responsibility.",
            ],
          },
          {
            value: "4",
            label: "4.0 | Above Standards",
            notes: [],
          },
          {
            value: "5",
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
            value: "1",
            label: "1.0 | Below Standards",
            notes: [
              "Creates conflict, unwilling to work with others, puts self above team.",
              "Fails to understand team goals or teamwork techniques.",
              "Does not take direction well.",
            ],
          },
          {
            value: "2",
            label: "2.0 | Progressing",
            notes: [],
          },
          {
            value: "3",
            label: "3.0 | Meets Standards",
            notes: [
              "Reinforces others' efforts, meets commitments to team.",
              "Understands goals, employs good teamwork techniques.",
              "Accepts and offers team direction.",
            ],
          },
          {
            value: "4",
            label: "4.0 | Above Standards",
            notes: [],
          },
          {
            value: "5",
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
            value: "1",
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
            value: "2",
            label: "2.0 | Progressing",
            notes: [],
          },
          {
            value: "3",
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
            value: "4",
            label: "4.0 | Above Standards",
            notes: [],
          },
          {
            value: "5",
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
  traitsChief: {
    deckplateLeader: {
      title: "Deckplate Leadership",
      subtitle: "Organizing, motivating and developing others to accomplish goals. Engaging and visible presence establishes positive tone for command.",
      standards: [
        {
          value: "0",
          label: "Not Observed",
          notes: [],
        },
        {
          value: "1",
          label: "1.0 | Below Standards",
          notes: [
            "Neglects growth/development or welfare of Junior Officer and Enlisted Sailors.",
            "Presence not felt on the deckplates.",
            "Does not set or achieve goals relevant to command mission and vision.",
            "Does not tailor leadership style to situation or individual.",
            "Fails to organize, creates problems for subordinates.",
            "Lacks ability to manage under stress.",
          ],
        },
        {
          value: "2",
          label: "2.0 | Progressing",
          notes: [],
        },
        {
          value: "3",
          label: "3.0 | Meets Standards",
          notes: [
            "Effectively stimulates growth/development in Junior Officers and Enlisted Sailors.",
            "Visible and engaged on the deckplate; sets positive tone.",
            "Sets/achieves useful, realistic goals that support command mission.",
            "Tailors leadership to situation to accomplish mission.",
            "Organizes successfully, implementing process improvements and efficiencies.",
            "Performs well in stressful situations.",
          ],
        },
        {
          value: "4",
          label: "4.0 | Above Standards",
          notes: [],
        },
        {
          value: "5",
          label: "5.0 | Greatly Exceeds Standards",
          notes: [
            "Inspiring motivator and trainer. Junior Officers and Enlisted Sailors reach highest level of growth and development.",
            "Always visible and engaged on the deckplate; energetically sets positive tone across CMD.",
            "Leadership achievements dramatically further command mission and vision.",
            "Seamlessly tailors leadership to each Sailor’s strengths, weaknesses and goals to maximize mission effectiveness.",
            "Superb organizer, great foresight, develops process improvements and efficiencies.",
            "Perseveres through the toughest challenges and inspires others.",
          ],
        },
      ],
    },
    technicalExpertise: {
      title: "Institutional and Technical Expertise",
      subtitle: "Institutional, policy and technical knowledge. Practical application, procedural compliance.",
      standards:
        [
          {
            value: "0",
            label: "Not Observed",
            notes: [],
          },
          {
            value: "1",
            label: "1.0 | Below Standards",
            notes: [
              "Lacks basic Navy knowledge.",
              "Unaware and unwilling to learn details of Navy programs and policies.",
              "Lacks basic professional knowledge to perform effectively.",
              "Cannot apply basic skills.",
              "Tactical knowledge and skill in specialty are below standards compared to others of same rank and experience.",
            ],
          },
          {
            value: "2",
            label: "2.0 | Progressing",
            notes: [],
          },
          {
            value: "3",
            label: "3.0 | Meets Standards",
            notes: [
              "Has thorough knowledge of Navy organization and structure.",
              "Has thorough knowledge of Navy programs and policies.",
              "Has detailed rating knowledge; resolves technical issues within rating.",
              "Competently performs both routine and new tasks.",
              "Tactical knowledge and skill in specialty equal to others of same rank and experience.",
            ],
          },
          {
            value: "4",
            label: "4.0 | Above Standards",
            notes: [],
          },
          {
            value: "5",
            label: "5.0 | Greatly Exceeds Standards",
            notes: [
              "Navy Expert, complete understanding of purpose, organization, and structure.",
              "Detailed, current knowledge and strong advocate for all Navy programs and policies.",
              "Recognized expert, sought after to solve difficult problems, executes innovative ideas.",
              "Exceptionally skilled; complete accuracy and precision in all technical actions, duties and procedures.",
              "Tactical knowledge and skill in command mission and function."
            ],
          },
        ],
    },
    professionalism: {
      title:
        "Professionalism",
      subtitle:
        "Standard enforcement; taking initiative, planning/prioritizing/solving challenges in Chief’s Mess. Continuous learning; Standards of appearance, conduct, physical fitness, qualifications.",
      standards:
        [
          {
            value: "0",
            label: "Not Observed",
            notes: [],
          },
          {
            value: "1",
            label: "1.0 | Below Standards",
            notes: [
              "Fails to uphold and enforce standards.",
              "Does not effectively utilize the Chief’s Mess to plan and solve challenges.",
              "Improvement of peers, subordinates, and self not a priority.",
              "Unable to meet one or more physical readiness standards.",
              "Consistently unsatisfactory appearance or unsatisfactory demeanor or conduct.",
              "Creates conflict, unwilling to work with others, puts self above team.",
            ],
          },
          {
            value: "2",
            label: "2.0 | Progressing",
            notes: [],
          },
          {
            value: "3",
            label: "3.0 | Meets Standards",
            notes: [
              "Actively teaches, upholds and enforces standards with peers and subordinates.",
              "Participates in command planning and problem solving through the Chief’s Mess.",
              "Committed to professional education/training for self and subordinates.",
              "Complies with physical readiness program.",
              "Excellent personal appearance and representative of the Navy.",
              "Reinforces others’ efforts, meets personal commitments to team.",
            ],
          },
          {
            value: "4",
            label: "4.0 | Above Standards",
            notes: [],
          },
          {
            value: "5",
            label: "5.0 | Greatly Exceeds Standards",
            notes: [
              "Proactively teaches, upholds, and enforces standards throughout the command.",
              "Actively leads command activities, solves command challenges, and drives mission accomplishment through the Chief’s Mess.",
              "Fosters an environment of improvement, education and professional development.",
              "A leader in physical readiness.",
              "Exemplary personal appearance and representative of the Navy.",
              "Team builder, inspires cooperation and focus on mission accomplishment; leverages talents of all Sailors.",
            ],
          },
        ],
    },
    loyalty: {
      title:
        "Loyalty",
      subtitle:
        "Loyalty to mission, seniors, peers and subordinates. Dedication to Sailor success, Sailor advocacy.",
      standards:
        [
          {
            value: "0",
            label: "Not Observed",
            notes: [],
          },
          {
            value: "1",
            label: "1.0 | Below Standards",
            notes: [
              "Does not consistently demonstrate loyalty to mission, seniors, peers or subordinates.",
              "Not concerned about Sailor success.",
              "Allows command challenges to impact Sailor readiness.",
            ],
          },
          {
            value: "2",
            label: "2.0 | Progressing",
            notes: [],
          },
          {
            value: "3",
            label: "3.0 | Meets Standards",
            notes: [
              "Loyal to mission, seniors, peers and subordinates; moral courage to raise issues and support the outcome.",
              "Effective mentor, actions adequately encourage/support subordinates’ personal/professional growth.",
              "Routinely solves command challenges before they significantly impact Sailor readiness.",
            ],
          },
          {
            value: "4",
            label: "4.0 | Above Standards",
            notes: [],
          },
          {
            value: "5",
            label: "5.0 | Greatly Exceeds Standards",
            notes: [
              "Loyal to mission, seniors, peers and subordinates; moral courage to raise issues and strength to fully support the outcome.",
              "Exemplary mentor, creates environment with outstanding professional growth opportunities for each Sailor.",
              "Proactively identifies and solves command challenges before they impact Sailor readiness.",
            ],
          },
        ],
    },
    character: {
      title:
        "Character",
      subtitle:
        "Integrity, adherence to Navy Core Values. -Recognition of Diversity. Contributes to growth, human worth and community.",
      standards:
        [
          {
            value: "0",
            label: "Not Observed",
            notes: [],
          },
          {
            value: "1",
            label: "1.0 | Below Standards",
            notes: [
              "Demonstrates exclusionary behavior, fails to value differences from cultural diversity.",
              "Lacks personal integrity and does not take responsibility for actions or decisions.",
              "Fails to live up to Navy Core Values: Honor Courage and Commitment.",
            ],
          },
          {
            value: "2",
            label: "2.0 | Progressing",
            notes: [],
          },
          {
            value: "3",
            label: "3.0 | Meets Standards",
            notes: [
              "Diversity: values differences as strengths, fosters atmosphere of acceptance/inclusion per EO/EEO policy.",
              "Trustworthy, ethical and honest.",
              "Always lives up to Navy Core Values: Honor, Courage and Commitment.",
            ],
          },
          {
            value: "4",
            label: "4.0 | Above Standards",
            notes: [],
          },
          {
            value: "5",
            label: "5.0 | Greatly Exceeds Standards",
            notes: [
              "Seamlessly integrates diversity into all aspects of the command.",
              "Model of achievement. Develops unit cohesion by valuing differences as strengths.",
              "Leads with an uncompromising code of integrity.",
              "Exemplifies Navy Core Values: Honor, Courage and Commitment.",
            ],
          },
        ],
    },
    activeCommunication: {
      title:
        "Active Communication",
      subtitle:
        "Communication, questioning attitude, energized information flow.",
      standards:
        [
          {
            value: "0",
            label: "Not Observed",
            notes: [],
          },
          {
            value: "1",
            label: "1.0 | Below Standards",
            notes: [
              "Stifles information exchange, idea sharing and diversity of opinion.",
              "Does not take advantage of the Chief’s Mess to discuss, plan, or act on command issues.",
              "Poor communicator; actions negatively impact mission goals and readiness.",
            ],
          },
          {
            value: "2",
            label: "2.0 | Progressing",
            notes: [],
          },
          {
            value: "3",
            label: "3.0 | Meets Standards",
            notes: [
              "Facilitates information exchange, idea sharing and diversity of opinion.",
              "Uses Chief’s Mess as an open forum to discuss, plan, and act on command issues.",
              "Effectively communicates and listens to subordinates, peers, and seniors.",
            ],
          },
          {
            value: "4",
            label: "4.0 | Above Standards",
            notes: [],
          },
          {
            value: "5",
            label: "5.0 | Greatly Exceeds Standards",
            notes: [
              "Actively facilitates information exchange, idea sharing and diversity of opinion.",
              "Actively uses Chief’s Mess as an open forum to discuss, plan, and act on command issues.",
              "Energizes communication flow up and down the chain of command.",
            ],
          },
        ],
    },
    heritage: {
      title:
        "Sense of Heritage",
      subtitle:
        "Know and teach customs and traditions, understand naval history.",
      standards:
        [
          {
            value: "0",
            label: "Not Observed",
            notes: [],
          },
          {
            value: "1",
            label: "1.0 | Below Standards",
            notes: [
              "Lacks knowledge and understanding of naval customs and traditions.",
              "Ignores naval traditions, customs, and practices when considering decisions, in training, or in daily leadership.",
              "No grasp of naval history.",
            ],
          },
          {
            value: "2",
            label: "2.0 | Progressing",
            notes: [],
          },
          {
            value: "3",
            label: "3.0 | Meets Standards",
            notes: [
              "Good understanding of naval customs and traditions.",
              "Integrates naval traditions, customs, and practices into decision making processes, training and daily leadership.",
              "Occasionally uses naval history to demonstrate who we are as a service.",
            ],
          },
          {
            value: "4",
            label: "4.0 | Above Standards",
            notes: [],
          },
          {
            value: "5",
            label: "5.0 | Greatly Exceeds Standards",
            notes: [
              "Thorough understanding of naval customs and traditions.",
              "Proactively integrates naval traditions, customs, and practices into decision making processes, training and daily leadership.",
              "Consistently uses naval history to demonstrate who we are as a service.",
            ],
          },
        ],
    }
  },
}
