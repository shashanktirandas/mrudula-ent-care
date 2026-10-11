export interface ConditionPage {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  introduction: string;

  overview: {
    title: string;
    description: string;
  };

  concerns: {
    title: string;
    description: string;
  }[];

  evaluation: {
    title: string;
    description: string;
  }[];

  relatedServices: {
    title: string;
    href: string;
  }[];

  urgentCare?: {
    title: string;
    description: string;
  };

  faqs: {
    question: string;
    answer: string;
  }[];
}

export const conditions: ConditionPage[] = [
  {
  slug: "ear",

  title: "Ear Care",

  shortTitle: "Ear",

  eyebrow: "ENT care · Ear",

  introduction:
    "Specialist evaluation for ear infections, hearing concerns, ear discharge, ear pain and other conditions affecting the ear.",

  overview: {
    title: "Understanding your ear concerns",

    description:
      "Ear symptoms can have different causes, ranging from infections and inflammation to problems involving the eardrum, middle ear or hearing system. A clinical ENT evaluation helps understand the symptoms and determine the appropriate next step.",
  },

  concerns: [
    {
      title: "Ear infections",
      description:
        "Evaluation of ear infections and related symptoms such as pain, discharge or changes in hearing.",
    },

    {
      title: "Ear pain",
      description:
        "Assessment of persistent or significant ear pain to understand its possible cause.",
    },

    {
      title: "Ear discharge",
      description:
        "Evaluation of fluid or discharge from the ear, particularly when it is persistent or recurrent.",
    },

    {
      title: "Hearing concerns",
      description:
        "Assessment of changes or difficulties with hearing and related ear symptoms.",
    },

    {
      title: "Blocked or full ear",
      description:
        "Evaluation of a blocked, plugged or full sensation in the ear.",
    },

    {
      title: "Eardrum problems",
      description:
        "Assessment of selected conditions affecting the eardrum, including perforation-related concerns.",
    },

    {
      title: "Recurrent ear problems",
      description:
        "Evaluation when ear infections, discharge, pain or other symptoms continue to return.",
    },

    {
      title: "Ear-related balance concerns",
      description:
        "Assessment when ear symptoms occur alongside dizziness, vertigo or balance-related concerns.",
    },
  ],

  evaluation: [
    {
      title: "Symptom history",
      description:
        "Your symptoms, their duration, pattern and relevant medical history are reviewed carefully.",
    },

    {
      title: "ENT examination",
      description:
        "The ear and surrounding areas are examined to identify visible signs that may explain the symptoms.",
    },

    {
      title: "Hearing assessment",
      description:
        "Hearing evaluation may be recommended when changes in hearing are part of the concern.",
    },

    {
      title: "Further diagnostic assessment",
      description:
        "Additional investigations may be considered when the clinical findings require further evaluation.",
    },

    {
      title: "Individualized care plan",
      description:
        "The findings are discussed with you and an appropriate treatment or follow-up plan is considered.",
    },
  ],

  relatedServices: [
    {
      title: "Endoscopy Services",
      href: "/services/endoscopy",
    },

    {
      title: "Minor ENT Procedures",
      href: "/services/minor-ent-procedures",
    },

    {
      title: "Vertigo & Balance",
      href: "/services/vertigo-balance",
    },
  ],

  urgentCare: {
    title: "When should an ear problem be assessed promptly?",

    description:
      "Sudden hearing changes, significant ear bleeding, severe ear pain, or rapidly worsening ear symptoms may require prompt medical assessment.",
  },

  faqs: [
    {
      question: "When should I see an ENT specialist for an ear problem?",

      answer:
        "An ENT evaluation may be appropriate for persistent or recurrent ear pain, discharge, hearing changes, repeated infections, eardrum concerns or other ongoing ear symptoms.",
    },

    {
      question: "Can ear infections affect hearing?",

      answer:
        "Ear infections can sometimes be associated with temporary or persistent changes in hearing. The effect depends on the underlying condition and should be assessed clinically.",
    },

    {
      question: "What should I do if I suddenly notice hearing loss?",

      answer:
        "Sudden hearing changes should be assessed promptly. Seek medical attention rather than waiting for the symptom to resolve on its own.",
    },

    {
      question: "Can dizziness be related to an ear problem?",

      answer:
        "Some balance-related conditions involve the inner ear. When dizziness or vertigo occurs alongside ear symptoms, an ENT evaluation may help determine the possible cause.",
    },

    {
      question: "Will every ear problem require a procedure?",

      answer:
        "No. Treatment depends on the underlying condition and clinical findings. Many ear concerns can be managed without a procedure.",
    },
  ],
},

  {
  slug: "nose-sinus",

  title: "Nose & Sinus Care",

  shortTitle: "Nose & Sinus",

  eyebrow: "ENT care · Nose & Sinus",

  introduction:
    "Specialist evaluation for nasal blockage, sinus concerns, allergies, nasal discharge and other conditions affecting the nose and sinuses.",

  overview: {
    title: "Understanding your nose and sinus concerns",

    description:
      "Nasal and sinus symptoms can have different causes, including allergies, inflammation, structural concerns and sinus-related conditions. An ENT evaluation helps understand the pattern of symptoms and determine the appropriate next step.",
  },

  concerns: [
    {
      title: "Nasal blockage",
      description:
        "Evaluation of persistent difficulty breathing through the nose and possible contributing factors.",
    },

    {
      title: "Chronic sinus concerns",
      description:
        "Assessment of persistent or recurrent symptoms involving the nose and sinuses.",
    },

    {
      title: "Allergic rhinitis",
      description:
        "Evaluation of allergy-related nasal symptoms such as sneezing, itching, runny nose and congestion.",
    },

    {
      title: "Persistent runny nose",
      description:
        "Assessment of ongoing nasal discharge and possible allergic, inflammatory or other causes.",
    },

    {
      title: "Nasal polyps",
      description:
        "Evaluation when nasal polyps are suspected or when persistent nasal symptoms require closer examination.",
    },

    {
      title: "Recurrent sneezing",
      description:
        "Assessment of frequent or persistent sneezing, particularly when an allergic cause may be involved.",
    },

    {
      title: "Recurrent nosebleeds",
      description:
        "Evaluation of repeated or persistent episodes of nasal bleeding.",
    },

    {
      title: "Deviated nasal septum",
      description:
        "Assessment of structural nasal blockage that may be associated with a deviated septum.",
    },

    {
      title: "Loss or change of smell",
      description:
        "Evaluation of changes in the ability to smell when associated with nasal or sinus symptoms.",
    },
  ],

  evaluation: [
    {
      title: "Symptom history",
      description:
        "Your symptoms, their duration, triggers and relevant medical history are reviewed carefully.",
    },

    {
      title: "Nasal and ENT examination",
      description:
        "The nose, throat and related ENT structures are examined based on your symptoms.",
    },

    {
      title: "Endoscopic assessment",
      description:
        "Nasal endoscopy may be considered when a closer view of the nasal passages is clinically appropriate.",
    },

    {
      title: "Allergy evaluation",
      description:
        "When symptoms suggest an allergic component, allergy assessment or testing may be considered.",
    },

    {
      title: "Further investigation",
      description:
        "Additional investigations may be recommended when the clinical findings require further assessment.",
    },

    {
      title: "Individualized care plan",
      description:
        "The findings are discussed with you and an appropriate management or follow-up plan is considered.",
    },
  ],

  relatedServices: [
    {
      title: "Allergy & Immunotherapy",
      href: "/services/allergy-immunotherapy",
    },

    {
      title: "Endoscopy Services",
      href: "/services/endoscopy",
    },

    {
      title: "Minor ENT Procedures",
      href: "/services/minor-ent-procedures",
    },
  ],

  urgentCare: {
    title: "When should a nose or sinus problem be assessed promptly?",

    description:
      "Significant or persistent nosebleeding, rapidly worsening symptoms, severe facial pain or other concerning changes may require prompt medical assessment.",
  },

  faqs: [
    {
      question: "When should I see an ENT specialist for nasal blockage?",

      answer:
        "An ENT evaluation may be appropriate when nasal blockage is persistent, recurrent, affects breathing or is associated with other symptoms such as recurrent sinus problems, nosebleeds or reduced sense of smell.",
    },

    {
      question: "Can allergies cause nasal blockage?",

      answer:
        "Yes. Allergic conditions can cause symptoms such as nasal congestion, sneezing, itching and runny nose. An evaluation can help determine whether allergy may be contributing to your symptoms.",
    },

    {
      question: "What is a nasal endoscopy?",

      answer:
        "Nasal endoscopy is an examination using a specialized endoscope to provide a detailed view of the nasal passages when a closer assessment is clinically appropriate.",
    },

    {
      question: "Can a deviated septum cause difficulty breathing through the nose?",

      answer:
        "A deviated nasal septum can contribute to nasal obstruction in some people. Clinical examination is needed to understand whether it is contributing to an individual's symptoms.",
    },

    {
      question: "When should a nosebleed receive medical attention?",

      answer:
        "Persistent, recurrent or significant nosebleeding should be medically assessed. If bleeding is severe or difficult to control, seek prompt medical attention.",
    },
  ],
},

  {
  slug: "throat-voice",

  title: "Throat & Voice Care",

  shortTitle: "Throat & Voice",

  eyebrow: "ENT care · Throat & Voice",

  introduction:
    "Specialist evaluation for throat discomfort, swallowing concerns, voice changes and other conditions affecting the throat and voice.",

  overview: {
    title: "Understanding your throat and voice concerns",

    description:
      "Throat and voice symptoms can have different causes, including infections, inflammation, vocal strain and other ENT conditions. A clinical evaluation helps understand the symptoms and determine the appropriate next step.",
  },

  concerns: [
    {
      title: "Persistent throat pain",
      description:
        "Evaluation of ongoing or recurrent throat discomfort that may require further ENT assessment.",
    },

    {
      title: "Hoarseness",
      description:
        "Assessment of persistent changes in voice quality, including a rough, weak or strained voice.",
    },

    {
      title: "Voice changes",
      description:
        "Evaluation of changes in the voice that persist or interfere with normal communication.",
    },

    {
      title: "Difficulty swallowing",
      description:
        "Assessment of difficulty or discomfort while swallowing food, liquids or saliva.",
    },

    {
      title: "Chronic throat irritation",
      description:
        "Evaluation of persistent throat irritation or discomfort and possible contributing factors.",
    },

    {
      title: "Persistent cough",
      description:
        "Assessment of an ongoing cough when an ENT-related cause may need to be considered.",
    },

    {
      title: "Tonsil concerns",
      description:
        "Evaluation of recurrent or persistent symptoms involving the tonsils.",
    },

    {
      title: "Adenoid-related concerns",
      description:
        "Assessment of selected adenoid-related problems, particularly when they affect breathing or other ENT symptoms.",
    },

    {
      title: "Throat and voice-related lesions",
      description:
        "Clinical assessment of persistent or unusual throat or voice-related findings when further evaluation is required.",
    },
  ],

  evaluation: [
    {
      title: "Symptom history",
      description:
        "Your symptoms, duration, triggers and relevant medical history are reviewed carefully.",
    },

    {
      title: "ENT examination",
      description:
        "The mouth, throat and related ENT structures are examined based on your symptoms.",
    },

    {
      title: "Voice assessment",
      description:
        "When voice changes are part of the concern, the nature and pattern of the voice symptoms are assessed.",
    },

    {
      title: "Endoscopic examination",
      description:
        "Throat or voice-box endoscopy may be considered when a closer examination is clinically appropriate.",
    },

    {
      title: "Further investigation",
      description:
        "Additional investigations may be recommended when the clinical findings require further assessment.",
    },

    {
      title: "Individualized care plan",
      description:
        "The findings are discussed with you and an appropriate treatment or follow-up plan is considered.",
    },
  ],

  relatedServices: [
    {
      title: "Endoscopy Services",
      href: "/services/endoscopy",
    },

    {
      title: "Minor ENT Procedures",
      href: "/services/minor-ent-procedures",
    },

    {
      title: "Emergency ENT Care",
      href: "/services/emergency-ent-care",
    },
  ],

  urgentCare: {
    title: "When should a throat or voice problem be assessed promptly?",

    description:
      "Severe difficulty swallowing, difficulty breathing, significant bleeding or rapidly worsening throat symptoms require prompt medical assessment.",
  },

  faqs: [
    {
      question: "When should persistent hoarseness be evaluated?",

      answer:
        "Persistent or recurrent voice changes should be clinically assessed, particularly when they do not improve or are associated with other throat or swallowing symptoms.",
    },

    {
      question: "What can cause changes in the voice?",

      answer:
        "Voice changes can have different causes, including inflammation, infection, vocal strain and other conditions affecting the throat or voice box. An ENT evaluation can help determine the possible cause.",
    },

    {
      question: "When should difficulty swallowing be evaluated?",

      answer:
        "Persistent or worsening difficulty swallowing should be medically assessed. Difficulty breathing, inability to swallow or rapidly worsening symptoms require prompt medical attention.",
    },

    {
      question: "What is throat endoscopy?",

      answer:
        "Throat endoscopy uses a specialized endoscope to provide a closer view of the throat and related structures when clinically appropriate.",
    },

    {
      question: "Can a persistent cough be related to an ENT condition?",

      answer:
        "Some persistent coughs can have an ENT-related component, although cough can have many different causes. Clinical evaluation helps determine what further assessment may be appropriate.",
    },
  ],
},

  {
  slug: "vertigo-balance",

  title: "Vertigo & Balance Care",

  shortTitle: "Vertigo & Balance",

  eyebrow: "ENT care · Vertigo & Balance",

  introduction:
    "Specialist evaluation for dizziness, vertigo, balance problems and other symptoms that may be related to the inner ear or vestibular system.",

  overview: {
    title: "Understanding dizziness and balance concerns",

    description:
      "Dizziness and balance symptoms can have different causes. A detailed history and ENT evaluation can help understand the pattern of symptoms and determine whether further vestibular, ear or related assessment is appropriate.",
  },

  concerns: [
    {
      title: "Vertigo",
      description:
        "Evaluation of spinning or rotational sensations, particularly when episodes are recurrent or disruptive.",
    },

    {
      title: "Positional dizziness",
      description:
        "Assessment of dizziness that occurs with changes in head or body position.",
    },

    {
      title: "Recurrent dizziness",
      description:
        "Evaluation of repeated episodes of dizziness and their associated symptoms.",
    },

    {
      title: "Balance problems",
      description:
        "Assessment of unsteadiness or difficulty maintaining normal balance.",
    },

    {
      title: "Inner ear-related symptoms",
      description:
        "Evaluation when dizziness or balance symptoms may be associated with an ear or vestibular condition.",
    },

    {
      title: "Vestibular concerns",
      description:
        "Assessment of symptoms that may involve the vestibular system responsible for balance and spatial orientation.",
    },

    {
      title: "Motion-related dizziness",
      description:
        "Evaluation of dizziness or imbalance associated with movement or changes in position.",
    },

    {
      title: "Dizziness with ear symptoms",
      description:
        "Assessment when dizziness occurs alongside hearing, ear pressure or other ear-related symptoms.",
    },
  ],

  evaluation: [
    {
      title: "Detailed symptom history",
      description:
        "The pattern, duration, triggers and associated symptoms of dizziness or vertigo are reviewed carefully.",
    },

    {
      title: "ENT examination",
      description:
        "The ears and related ENT structures are examined for findings that may contribute to the symptoms.",
    },

    {
      title: "Balance assessment",
      description:
        "Balance and positional symptoms may be assessed based on the history and clinical presentation.",
    },

    {
      title: "Vestibular assessment",
      description:
        "Further vestibular evaluation may be considered when the symptoms indicate a possible balance-system disorder.",
    },

    {
      title: "Related neurological screening",
      description:
        "Relevant neurological features may be considered as part of the clinical assessment when appropriate.",
    },

    {
      title: "Individualized care plan",
      description:
        "The findings are explained and an appropriate treatment, further evaluation or follow-up plan is considered.",
    },
  ],

  relatedServices: [
    {
      title: "Vertigo & Balance",
      href: "/services/vertigo-balance",
    },

    {
      title: "Endoscopy Services",
      href: "/services/endoscopy",
    },

    {
      title: "Emergency ENT Care",
      href: "/services/emergency-ent-care",
    },
  ],

  urgentCare: {
    title: "When should dizziness or vertigo be assessed urgently?",

    description:
      "Sudden or severe dizziness accompanied by concerning symptoms, inability to walk safely, fainting, severe headache, new neurological symptoms or other rapidly worsening symptoms requires prompt medical assessment.",
  },

  faqs: [
    {
      question: "What is vertigo?",

      answer:
        "Vertigo is a sensation of movement, often described as spinning or the surroundings moving. It can have different causes and may require clinical evaluation.",
    },

    {
      question: "Can an inner ear problem cause dizziness?",

      answer:
        "Some inner ear and vestibular conditions can cause dizziness or vertigo. An ENT evaluation can help determine whether the symptoms may be related to the ear or balance system.",
    },

    {
      question: "Why does dizziness sometimes happen when changing position?",

      answer:
        "Some types of vertigo can be triggered by changes in head or body position. The pattern of symptoms can help guide the clinical evaluation.",
    },

    {
      question: "What happens during a vertigo evaluation?",

      answer:
        "The evaluation generally begins with a detailed history followed by an ENT examination and appropriate balance or vestibular assessment based on the symptoms.",
    },

    {
      question: "When is dizziness an emergency?",

      answer:
        "Sudden severe dizziness with new neurological symptoms, fainting, inability to walk safely, severe headache or other rapidly worsening symptoms requires prompt medical attention.",
    },
  ],
},

  {
  slug: "pediatric-ent",

  title: "Pediatric ENT Care",

  shortTitle: "Children's ENT",

  eyebrow: "ENT care · Pediatric ENT",

  introduction:
    "Specialist ENT evaluation for children with ear, nose, throat, hearing, breathing and related ENT concerns.",

  overview: {
    title: "ENT care designed around children",

    description:
      "Children can experience ENT problems differently from adults. A careful history, age-appropriate examination and clear communication with parents or caregivers help guide the right next step.",
  },

  concerns: [
    {
      title: "Recurrent ear infections",
      description:
        "Evaluation of repeated or persistent ear infections and related ear symptoms in children.",
    },

    {
      title: "Hearing concerns",
      description:
        "Assessment when a child appears to have difficulty hearing or responding to sounds normally.",
    },

    {
      title: "Ear discharge",
      description:
        "Evaluation of persistent or recurrent discharge from the ear.",
    },

    {
      title: "Nasal blockage",
      description:
        "Assessment of persistent difficulty breathing through the nose or other nasal symptoms.",
    },

    {
      title: "Allergy-related nasal symptoms",
      description:
        "Evaluation of recurrent sneezing, runny nose, nasal blockage and other allergy-related ENT symptoms.",
    },

    {
      title: "Tonsil concerns",
      description:
        "Assessment of recurrent or persistent symptoms involving the tonsils.",
    },

    {
      title: "Adenoid-related concerns",
      description:
        "Evaluation of symptoms that may be associated with enlarged or problematic adenoids.",
    },

    {
      title: "Throat and voice concerns",
      description:
        "Assessment of persistent throat discomfort, voice changes or related symptoms in children.",
    },

    {
      title: "Pediatric ENT infections",
      description:
        "Evaluation of recurrent or persistent infections involving the ear, nose or throat.",
    },
  ],

  evaluation: [
    {
      title: "Parent or caregiver history",
      description:
        "The child's symptoms, duration, frequency and relevant medical history are discussed with the parent or caregiver.",
    },

    {
      title: "Age-appropriate ENT examination",
      description:
        "The ears, nose, throat and related structures are examined according to the child's symptoms and comfort.",
    },

    {
      title: "Hearing assessment",
      description:
        "Hearing evaluation may be recommended when there are concerns about hearing or ear-related symptoms.",
    },

    {
      title: "Nasal and throat assessment",
      description:
        "The nose and throat are evaluated when symptoms such as blockage, recurrent infections or breathing concerns are present.",
    },

    {
      title: "Further evaluation",
      description:
        "Additional investigations may be considered when the clinical findings indicate that further assessment is needed.",
    },

    {
      title: "Care plan for the child",
      description:
        "The findings are explained clearly to parents or caregivers and an appropriate treatment or follow-up plan is considered.",
    },
  ],

  relatedServices: [
    {
      title: "Endoscopy Services",
      href: "/services/endoscopy",
    },

    {
      title: "Allergy & Immunotherapy",
      href: "/services/allergy-immunotherapy",
    },

    {
      title: "Minor ENT Procedures",
      href: "/services/minor-ent-procedures",
    },
  ],

  urgentCare: {
    title: "When does a child need prompt ENT attention?",

    description:
      "Difficulty breathing, significant bleeding, a suspected airway or throat foreign body, severe worsening symptoms or other signs of an acute emergency require prompt medical attention.",
  },

  faqs: [
    {
      question: "When should a child see an ENT specialist?",

      answer:
        "An ENT evaluation may be appropriate when a child has recurrent or persistent ear, nose, throat, hearing or related symptoms that need specialist assessment.",
    },

    {
      question: "Can children have recurrent ear infections?",

      answer:
        "Yes. Recurrent ear infections can occur in children and may require evaluation to understand the pattern and determine appropriate management.",
    },

    {
      question: "When should a child's hearing be checked?",

      answer:
        "Hearing should be assessed when there are concerns about a child's hearing, responses to sounds or ear-related symptoms. The appropriate assessment depends on the child's age and clinical situation.",
    },

    {
      question: "Can enlarged adenoids cause ENT problems in children?",

      answer:
        "Adenoid-related problems can contribute to certain ENT symptoms in children. An ENT examination can help determine whether the adenoids may be relevant to the child's symptoms.",
    },

    {
      question: "What should parents expect during a pediatric ENT visit?",

      answer:
        "The visit generally begins with a discussion of the child's symptoms and medical history, followed by an age-appropriate ENT examination and any further assessment that may be appropriate.",
    },
  ],
},

  {
  slug: "head-neck",

  title: "Head & Neck Care",

  shortTitle: "Head & Neck",

  eyebrow: "ENT care · Head & Neck",

  introduction:
    "Specialist evaluation for head and neck swellings, oral lesions, neck concerns and other conditions requiring focused ENT assessment.",

  overview: {
    title: "Understanding head and neck concerns",

    description:
      "Head and neck symptoms can have many different causes. A careful clinical assessment helps understand the nature of a swelling, lesion or other concern and determine whether further investigation or treatment is appropriate.",
  },

  concerns: [
    {
      title: "Neck swellings",
      description:
        "Evaluation of new, persistent or recurrent swellings in the neck.",
    },

    {
      title: "Neck masses",
      description:
        "Assessment of a lump or mass in the neck to understand its clinical characteristics and determine the appropriate next step.",
    },

    {
      title: "Oral cavity lesions",
      description:
        "Clinical assessment of unusual, persistent or symptomatic lesions affecting the mouth.",
    },

    {
      title: "Persistent oral ulcers",
      description:
        "Evaluation of ulcers or sores in the mouth that persist, recur or require further assessment.",
    },

    {
      title: "Salivary gland swellings",
      description:
        "Assessment of swelling or other symptoms involving the salivary glands.",
    },

    {
      title: "Benign head and neck tumours",
      description:
        "Evaluation of selected benign tumours and swellings affecting the head and neck region.",
    },

    {
      title: "Mucous retention cysts",
      description:
        "Assessment of mucous retention cysts and related lesions when clinical evaluation or treatment is required.",
    },

    {
      title: "Ear keloids",
      description:
        "Evaluation of keloid formation around the ear or ear lobule and consideration of appropriate management.",
    },

    {
      title: "Oral submucous fibrosis",
      description:
        "Clinical evaluation of symptoms and findings associated with oral submucous fibrosis.",
    },
  ],

  evaluation: [
    {
      title: "Detailed clinical history",
      description:
        "The nature, duration, progression and associated symptoms of the concern are reviewed carefully.",
    },

    {
      title: "Head and neck examination",
      description:
        "The relevant areas of the head, neck and oral cavity are examined based on the presenting concern.",
    },

    {
      title: "Assessment of the lesion or swelling",
      description:
        "The location, size, appearance and clinical characteristics of a swelling or lesion are assessed where appropriate.",
    },

    {
      title: "Endoscopic assessment",
      description:
        "Endoscopic examination may be considered when closer visualization of relevant ENT structures is clinically appropriate.",
    },

    {
      title: "Further investigation",
      description:
        "Additional investigations may be recommended when the examination indicates that further assessment is necessary.",
    },

    {
      title: "Individualized care plan",
      description:
        "The findings are discussed clearly and an appropriate treatment, further investigation or follow-up plan is considered.",
    },
  ],

  relatedServices: [
    {
      title: "Head & Neck Care",
      href: "/services/head-neck",
    },

    {
      title: "Minor ENT Procedures",
      href: "/services/minor-ent-procedures",
    },

    {
      title: "Endoscopy Services",
      href: "/services/endoscopy",
    },
  ],

  urgentCare: {
    title: "When should a head or neck concern be assessed promptly?",

    description:
      "Rapidly increasing swelling, significant bleeding, difficulty breathing or swallowing, or other rapidly worsening symptoms require prompt medical assessment.",
  },

  faqs: [
    {
      question: "When should a neck swelling be evaluated?",

      answer:
        "A new, persistent or enlarging neck swelling should be clinically assessed so that its characteristics can be understood and the appropriate next step determined.",
    },

    {
      question: "Should a persistent mouth ulcer be checked?",

      answer:
        "Persistent or recurrent oral ulcers should be evaluated, particularly when they do not improve or are associated with other concerning symptoms.",
    },

    {
      question: "What happens during a head and neck evaluation?",

      answer:
        "The evaluation generally includes a detailed history and examination of the relevant head, neck and oral structures. Further investigation may be recommended when clinically appropriate.",
    },

    {
      question: "Can salivary gland swelling require ENT assessment?",

      answer:
        "Yes. Salivary gland swelling can have different causes and may require an ENT assessment to understand the clinical findings and determine whether further investigation is needed.",
    },

    {
      question: "When is a head or neck symptom urgent?",

      answer:
        "Rapidly worsening swelling, difficulty breathing or swallowing, significant bleeding or other severe acute symptoms require prompt medical attention.",
    },
  ],
},
];