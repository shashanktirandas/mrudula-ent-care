export interface ServicePage {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  introduction: string;

  overview: {
    title: string;
    description: string;
  };

  careAreas: {
    title: string;
    description: string;
  }[];

  evaluation: {
    title: string;
    description: string;
  }[];

  faqs: {
    question: string;
    answer: string;
  }[];
}

export const services: ServicePage[] = [
  {
    slug: "allergy-immunotherapy",

    title: "Allergy & Immunotherapy",

    shortTitle: "Allergy & Immunotherapy",

    eyebrow: "Specialized care · Allergy",

    introduction:
      "Evaluation and personalized care for allergic rhinitis, nasal allergies and related respiratory allergy concerns.",

    overview: {
      title: "Understanding your allergy concerns",

      description:
        "Dr. Mrudula ENT Care provides allergy evaluation and individualized care for patients experiencing nasal and respiratory allergy symptoms. Assessment may include a detailed clinical history, symptom evaluation and allergy testing when clinically appropriate.",
    },

    careAreas: [
      {
        title: "Allergic rhinitis",
        description:
          "Evaluation of nasal allergy symptoms such as sneezing, runny nose and nasal irritation.",
      },
      {
        title: "Seasonal allergies",
        description:
          "Assessment of allergy symptoms that may occur or worsen during particular seasons.",
      },
      {
        title: "Perennial allergies",
        description:
          "Evaluation of allergy symptoms that may persist throughout the year.",
      },
      {
        title: "Dust allergy",
        description:
          "Assessment of symptoms that may be associated with exposure to dust and other environmental triggers.",
      },
      {
        title: "Persistent sneezing",
        description:
          "Evaluation of recurrent or persistent sneezing when an allergic cause may be involved.",
      },
      {
        title: "Nasal blockage",
        description:
          "Assessment of ongoing nasal obstruction or difficulty breathing through the nose.",
      },
      {
        title: "Persistent runny nose",
        description:
          "Evaluation of ongoing nasal discharge and possible allergy-related causes.",
      },
      {
        title: "Sinus-related allergy concerns",
        description:
          "Assessment when allergy symptoms occur alongside ongoing nasal or sinus concerns.",
      },
      {
        title: "Respiratory allergies",
        description:
          "Evaluation of respiratory symptoms when an allergic component may be contributing.",
      },
    ],

    evaluation: [
      {
        title: "Clinical history",
        description:
          "A detailed discussion of symptoms, their pattern and relevant medical history.",
      },
      {
        title: "Trigger assessment",
        description:
          "Assessment of possible environmental or other factors associated with symptoms.",
      },
      {
        title: "Clinical examination",
        description:
          "An ENT examination to understand the patient's nasal and related symptoms.",
      },
      {
        title: "Allergy testing",
        description:
          "Allergy testing may be considered when clinically indicated.",
      },
      {
        title: "Individualized care plan",
        description:
          "The findings are discussed with the patient and an appropriate management approach is considered.",
      },
    ],

    faqs: [
      {
        question: "What allergy problems can be evaluated?",

        answer:
          "The clinic evaluates concerns such as allergic rhinitis, seasonal and perennial allergies, persistent sneezing, nasal blockage, runny nose and other nasal or respiratory allergy symptoms.",
      },
      {
        question: "Is allergy testing required for everyone?",

        answer:
          "Not necessarily. The need for allergy testing depends on the patient's symptoms, history and clinical evaluation.",
      },
      {
        question: "What is immunotherapy?",

        answer:
          "Allergen immunotherapy is a treatment approach that may be considered for selected patients after appropriate clinical assessment and allergy evaluation.",
      },
    ],
  },

  {
  slug: "endoscopy",

  title: "Endoscopy Services",

  shortTitle: "Endoscopy",

  eyebrow: "Specialized care · Endoscopy",

  introduction:
    "Detailed examination of the ear, nose and throat when a closer view is needed for clinical evaluation.",

  overview: {
    title: "A closer look when needed",

    description:
      "ENT endoscopy allows detailed visualization of internal ear, nose and throat structures using a specialized endoscope. At Dr. Mrudula ENT Care, endoscopic evaluation is used to help assess a range of ENT concerns and support accurate diagnosis and treatment planning.",
  },

  careAreas: [
    {
      title: "Nasal blockage",
      description:
        "Evaluation of persistent difficulty breathing through the nose when a closer examination may be needed.",
    },

    {
      title: "Chronic sinus concerns",
      description:
        "Detailed examination of the nasal cavity and sinuses when symptoms such as recurrent or persistent sinus problems require further evaluation.",
    },

    {
      title: "Nasal polyps",
      description:
        "Endoscopic examination can provide a clearer view of the nasal cavity when nasal polyps are suspected or need assessment.",
    },

    {
      title: "Recurrent nosebleeds",
      description:
        "A closer nasal examination may help evaluate persistent or recurrent episodes of nasal bleeding.",
    },

    {
      title: "Hoarseness and voice concerns",
      description:
        "Throat endoscopy can examine the throat and voice box when persistent voice changes or hoarseness require further assessment.",
    },

    {
      title: "Swallowing difficulties",
      description:
        "Endoscopic examination may be used when persistent difficulty swallowing requires a closer evaluation of the throat.",
    },

    {
      title: "Chronic ear problems",
      description:
        "Endoscopic ear examination provides detailed visualization of the ear canal and eardrum when ongoing ear concerns need assessment.",
    },

    {
      title: "Hearing-related concerns",
      description:
        "An endoscopic ear examination may form part of the clinical evaluation when hearing problems are associated with visible ear findings.",
    },

    {
      title: "Post-operative follow-up",
      description:
        "Endoscopic examination may be used to monitor healing after selected ENT procedures or ear surgery.",
    },
  ],

  evaluation: [
    {
      title: "Review of symptoms",
      description:
        "Your ENT specialist reviews your symptoms, medical history and the reason an endoscopic examination may be appropriate.",
    },

    {
      title: "Detailed ENT examination",
      description:
        "A clinical examination is performed before deciding on the required endoscopic evaluation.",
    },

    {
      title: "Endoscopic evaluation",
      description:
        "The appropriate area of the ear, nose or throat is examined using the required endoscopic technique.",
    },

    {
      title: "Explanation of findings",
      description:
        "The findings are discussed clearly so you understand what was observed during the examination.",
    },

    {
      title: "Next-step planning",
      description:
        "Depending on the findings, further treatment or investigations may be recommended.",
    },
  ],

  faqs: [
    {
      question: "What is an ENT endoscopy?",

      answer:
        "ENT endoscopy is a diagnostic examination that uses a specialized endoscope to provide a detailed view of structures inside the ear, nose or throat.",
    },

    {
      question: "What areas can be examined?",

      answer:
        "The clinic provides diagnostic endoscopy for the nose, throat and ear, depending on the symptoms and clinical requirements.",
    },

    {
      question: "Why might I need a nasal endoscopy?",

      answer:
        "A nasal endoscopy may be recommended for concerns such as persistent nasal blockage, chronic sinus problems, nasal polyps, recurrent nosebleeds, deviated nasal septum, allergy-related nasal problems or chronic nasal discharge.",
    },

    {
      question: "When is throat endoscopy useful?",

      answer:
        "Throat endoscopy may be used to evaluate persistent concerns such as hoarseness, chronic throat pain, difficulty swallowing, persistent cough and voice-related symptoms.",
    },

    {
      question: "Can the ear be examined using an endoscope?",

      answer:
        "Yes. Endoscopic ear examination can provide detailed visualization of the ear canal and eardrum and may be useful when evaluating chronic ear discharge, infections, eardrum perforations and other ear concerns.",
    },

    {
      question: "Will I need to stay in the hospital for an endoscopy?",

      answer:
        "The clinic describes its endoscopic evaluations as outpatient procedures. Whether any additional observation or investigation is required depends on the individual clinical situation.",
    },
  ],
},

  {
  slug: "vertigo-balance",

  title: "Vertigo & Balance",

  shortTitle: "Vertigo & Balance",

  eyebrow: "Specialized care · Balance",

  introduction:
    "Evaluation and management of vertigo, dizziness and balance-related concerns, with attention to identifying the underlying cause.",

  overview: {
    title: "Understanding dizziness and balance",

    description:
      "Vertigo can feel like you or your surroundings are spinning or moving. At Dr. Mrudula ENT Care, evaluation begins with understanding your symptoms, medical history and balance-related concerns before determining the appropriate clinical assessment and treatment approach.",
  },

  careAreas: [
    {
      title: "Benign Paroxysmal Positional Vertigo",
      description:
        "Evaluation of positional spinning sensations that may occur with particular head movements.",
    },

    {
      title: "Recurrent dizziness",
      description:
        "Assessment of repeated episodes of dizziness when the underlying cause needs to be investigated.",
    },

    {
      title: "Balance disorders",
      description:
        "Evaluation of unsteadiness and difficulty maintaining balance.",
    },

    {
      title: "Vestibular disorders",
      description:
        "Assessment of concerns involving the vestibular system and its role in balance.",
    },

    {
      title: "Inner ear conditions",
      description:
        "Evaluation of balance-related symptoms when an inner-ear cause may be involved.",
    },

    {
      title: "Motion-related vertigo",
      description:
        "Assessment of dizziness or spinning sensations associated with movement.",
    },

    {
      title: "Positional dizziness",
      description:
        "Evaluation when dizziness or spinning occurs after changing head or body position.",
    },

    {
      title: "Vestibular imbalance",
      description:
        "Clinical assessment of symptoms suggesting difficulty with the balance system.",
    },
  ],

  evaluation: [
    {
      title: "Detailed medical history",
      description:
        "Your symptoms, their timing, triggers and relevant medical history are reviewed carefully.",
    },

    {
      title: "Clinical balance assessment",
      description:
        "A clinical assessment helps understand balance-related symptoms and functional difficulties.",
    },

    {
      title: "Vestibular examination",
      description:
        "The vestibular system is assessed as part of the evaluation when clinically appropriate.",
    },

    {
      title: "Positional testing",
      description:
        "Specific positional testing may be performed when symptoms suggest a positional cause such as BPPV.",
    },

    {
      title: "Ear examination",
      description:
        "The ears are examined as part of the assessment when an ear-related cause may be contributing to symptoms.",
    },

    {
      title: "Neurological screening",
      description:
        "Neurological screening may be considered when required based on the clinical presentation.",
    },
  ],

  faqs: [
    {
      question: "What does vertigo feel like?",

      answer:
        "Vertigo is commonly described as a sensation that you or your surroundings are spinning or moving. It can occur with symptoms such as nausea, imbalance or difficulty walking.",
    },

    {
      question: "What is BPPV?",

      answer:
        "Benign Paroxysmal Positional Vertigo, or BPPV, is a common cause of positional vertigo associated with movement of the head.",
    },

    {
      question: "How is vertigo evaluated?",

      answer:
        "Evaluation may include a detailed medical history, clinical balance assessment, vestibular examination, positional testing and ear examination. Neurological screening may also be considered when required.",
    },

    {
      question: "What are repositioning manoeuvres?",

      answer:
        "Repositioning manoeuvres are non-surgical techniques used in appropriate patients with positional vertigo such as BPPV.",
    },

    {
      question: "Does every episode of dizziness mean I have vertigo?",

      answer:
        "No. Dizziness can have different causes. A clinical evaluation is important to understand the nature and possible cause of your symptoms.",
    },
  ],
},

  {
  slug: "minor-ent-procedures",

  title: "Minor ENT Procedures",

  shortTitle: "Minor ENT Procedures",

  eyebrow: "Specialized care · Procedures",

  introduction:
    "Selected outpatient ENT procedures provided after careful clinical evaluation and individualized treatment planning.",

  overview: {
    title: "Focused care when a procedure is appropriate",

    description:
      "Dr. Mrudula ENT Care provides selected minor ENT procedures in an outpatient setting. Each procedure begins with a clinical assessment to understand the condition and determine the most appropriate approach for the individual patient.",
  },

  careAreas: [
    {
      title: "Ear lobule repair",
      description:
        "Evaluation and repair of torn, stretched or split earlobes, including damage associated with earrings or trauma.",
    },

    {
      title: "Keloid management",
      description:
        "Assessment and management of raised scar tissue that may develop after ear piercing, injury, surgery or other skin trauma.",
    },

    {
      title: "Mucous retention cysts",
      description:
        "Evaluation and management of mucous retention cysts affecting areas such as the lips or oral cavity.",
    },

    {
      title: "Foreign body removal",
      description:
        "Clinical assessment and removal of selected foreign bodies involving the ear, nose or throat when appropriate.",
    },

    {
      title: "Biopsy",
      description:
        "Selected lesions or areas of concern may require tissue sampling for further clinical or histopathological evaluation.",
    },

    {
      title: "Minor ENT lesions",
      description:
        "Evaluation of selected small lesions or localized ENT concerns to determine whether observation, medical care or a procedure is appropriate.",
    },
  ],

  evaluation: [
    {
      title: "Clinical examination",
      description:
        "The affected area is examined and your symptoms and relevant medical history are reviewed.",
    },

    {
      title: "Diagnosis",
      description:
        "The clinical findings are assessed to understand the nature of the condition and whether a minor procedure is appropriate.",
    },

    {
      title: "Treatment planning",
      description:
        "The available approach is discussed with you based on the condition, its location and your individual needs.",
    },

    {
      title: "Procedure",
      description:
        "When appropriate, the selected procedure is performed in an outpatient setting using the required technique and anaesthesia.",
    },

    {
      title: "Aftercare and follow-up",
      description:
        "Post-procedure instructions and follow-up are provided according to the procedure and individual clinical requirements.",
    },
  ],

  faqs: [
    {
      question: "Are minor ENT procedures performed as outpatient procedures?",

      answer:
        "The clinic provides selected minor ENT procedures on an outpatient basis. Whether a procedure is suitable for outpatient care depends on the individual condition and clinical assessment.",
    },

    {
      question: "What minor ENT procedures are offered?",

      answer:
        "The clinic's published services include procedures and management such as ear lobule repair, keloid management, mucous retention cyst treatment, foreign body removal and biopsy-related care.",
    },

    {
      question: "Is local anaesthesia used?",

      answer:
        "Local anaesthesia may be used for appropriate procedures when clinically suitable. The anaesthesia and procedure approach depend on the individual case.",
    },

    {
      question: "Will I need to stay in the hospital?",

      answer:
        "Many minor ENT procedures are performed on an outpatient basis. Your doctor will explain the appropriate setting based on your specific condition and procedure.",
    },

    {
      question: "Will I need a follow-up after the procedure?",

      answer:
        "Follow-up requirements depend on the procedure and individual clinical situation. Appropriate post-procedure instructions will be provided.",
    },
  ],
},

  {
  slug: "head-neck",

  title: "Head & Neck Care",

  shortTitle: "Head & Neck",

  eyebrow: "Specialized care · Head & Neck",

  introduction:
    "Specialized evaluation of head and neck swellings, oral lesions, cysts and other concerns requiring careful ENT assessment.",

  overview: {
    title: "Careful evaluation when something needs attention",

    description:
      "Persistent swellings, unusual lumps, oral lesions and other changes in the head and neck region can have many possible causes. Dr. Mrudula ENT Care provides clinical evaluation, diagnostic assessment and individualized treatment planning for selected head and neck conditions.",
  },

  careAreas: [
    {
      title: "Oral cavity lesions",
      description:
        "Evaluation of unusual or persistent lesions affecting the mouth and oral cavity.",
    },

    {
      title: "Head & neck swellings",
      description:
        "Assessment of unexplained or persistent swellings in the head and neck region.",
    },

    {
      title: "Neck masses",
      description:
        "Clinical evaluation of lumps or masses in the neck to understand their possible cause.",
    },

    {
      title: "Benign tumours",
      description:
        "Assessment and management planning for selected benign tumours affecting the head and neck.",
    },

    {
      title: "Suspicious oral ulcers",
      description:
        "Evaluation of persistent or unusual oral ulcers that require closer clinical assessment.",
    },

    {
      title: "Mucous retention cysts",
      description:
        "Assessment of mucous retention cysts and related oral swellings when treatment may be required.",
    },

    {
      title: "Salivary gland swellings",
      description:
        "Evaluation of swellings involving the salivary glands and surrounding tissues.",
    },

    {
      title: "Oral Submucous Fibrosis",
      description:
        "Evaluation and staged management of Oral Submucous Fibrosis, including assessment of oral function and mouth opening.",
    },

    {
      title: "Ear keloids",
      description:
        "Assessment and individualized management of raised scar tissue affecting the ear.",
    },
  ],

  evaluation: [
    {
      title: "Detailed clinical examination",
      description:
        "Your symptoms, medical history and the affected area are assessed carefully during the clinical examination.",
    },

    {
      title: "Diagnostic assessment",
      description:
        "Additional investigations may be considered when required to understand the nature of a swelling, lesion or other clinical finding.",
    },

    {
      title: "Biopsy when indicated",
      description:
        "Selected persistent or suspicious lesions may require tissue sampling for histopathological examination.",
    },

    {
      title: "Individualized treatment planning",
      description:
        "The findings are discussed with you and an appropriate management approach is planned according to the clinical situation.",
    },

    {
      title: "Follow-up",
      description:
        "Follow-up may be recommended to monitor healing, symptoms or the response to treatment depending on the condition.",
    },
  ],

  faqs: [
    {
      question: "When should a head or neck swelling be evaluated?",

      answer:
        "A persistent or unexplained swelling, lump or other unusual change in the head or neck should be clinically assessed, particularly when it does not resolve or is associated with other symptoms.",
    },

    {
      question: "What conditions can be evaluated?",

      answer:
        "The clinic's published services include evaluation of oral cavity lesions, head and neck swellings, benign tumours, suspicious oral ulcers, mucous retention cysts, Oral Submucous Fibrosis, ear keloids, neck masses and salivary gland swellings.",
    },

    {
      question: "What is an excision biopsy?",

      answer:
        "An excision biopsy involves removing a lesion or abnormal tissue when clinically indicated and sending the tissue for histopathological examination to help establish a diagnosis.",
    },

    {
      question: "What is Oral Submucous Fibrosis?",

      answer:
        "Oral Submucous Fibrosis is a chronic condition affecting the tissues inside the mouth. The clinic provides clinical evaluation and staged management, including measures aimed at improving oral function and mouth opening.",
    },

    {
      question: "Will every head or neck lump require a biopsy?",

      answer:
        "Not necessarily. The need for a biopsy depends on the clinical examination and other findings. Your doctor will determine whether additional investigation is appropriate.",
    },
  ],
},

  {
  slug: "emergency-ent-care",

  title: "Emergency ENT Care",

  shortTitle: "Emergency ENT Care",

  eyebrow: "Specialized care · Urgent",

  introduction:
    "Prompt assessment for urgent ear, nose and throat concerns that require timely ENT attention.",

  overview: {
    title: "When prompt ENT attention matters",

    description:
      "Some ear, nose and throat problems require timely assessment rather than waiting for a routine appointment. Dr. Mrudula ENT Care provides evaluation of urgent ENT concerns and helps determine the appropriate next step based on the clinical situation.",
  },

  careAreas: [
    {
      title: "Sudden hearing concerns",
      description:
        "Urgent assessment of sudden or rapidly changing hearing-related symptoms.",
    },

    {
      title: "Severe ear pain",
      description:
        "Evaluation of significant or rapidly worsening ear pain when prompt ENT assessment may be appropriate.",
    },

    {
      title: "Persistent or significant ear bleeding",
      description:
        "Assessment of unexplained or significant bleeding involving the ear.",
    },

    {
      title: "Nosebleeds",
      description:
        "Evaluation of persistent or significant nasal bleeding requiring medical attention.",
    },

    {
      title: "Foreign bodies",
      description:
        "Assessment and appropriate management of selected foreign bodies involving the ear, nose or throat.",
    },

    {
      title: "Acute throat concerns",
      description:
        "Evaluation of significant throat symptoms when timely assessment is required.",
    },

    {
      title: "Sudden voice changes",
      description:
        "Assessment of sudden or significant changes in the voice when prompt evaluation may be appropriate.",
    },

    {
      title: "Acute dizziness or vertigo",
      description:
        "Clinical assessment of sudden or severe dizziness or vertigo to determine the appropriate next step.",
    },
  ],

  evaluation: [
    {
      title: "Immediate symptom assessment",
      description:
        "The nature, severity and timing of the symptoms are reviewed to understand how urgently evaluation is required.",
    },

    {
      title: "Focused ENT examination",
      description:
        "A focused examination is performed based on the symptoms and affected area.",
    },

    {
      title: "Clinical assessment",
      description:
        "The findings are assessed to determine the likely cause and appropriate management or referral.",
    },

    {
      title: "Treatment or intervention",
      description:
        "When appropriate, urgent treatment or an ENT procedure may be recommended based on the clinical findings.",
    },

    {
      title: "Further referral when necessary",
      description:
        "If the situation requires emergency hospital-level care or another specialist service, appropriate referral may be advised.",
    },
  ],

  faqs: [
    {
      question: "What ENT problems may need urgent attention?",

      answer:
        "Problems such as significant nosebleeds, sudden hearing-related symptoms, severe ear pain, foreign bodies and other rapidly developing ENT concerns may require timely assessment.",
    },

    {
      question: "Should I wait for a routine appointment if my symptoms are severe?",

      answer:
        "If symptoms are severe, rapidly worsening or concerning, seek appropriate medical attention promptly rather than waiting for a routine appointment.",
    },

    {
      question: "What should I do in a life-threatening emergency?",

      answer:
        "A life-threatening emergency requires immediate emergency medical care. Go to the nearest emergency department or contact your local emergency medical service rather than waiting for a clinic appointment.",
    },

    {
      question: "Can foreign bodies be treated by an ENT specialist?",

      answer:
        "Selected foreign bodies involving the ear, nose or throat can be assessed and managed by an ENT specialist. The appropriate approach depends on the location and nature of the foreign body.",
    },

    {
      question: "Will every urgent ENT problem require a procedure?",

      answer:
        "No. The appropriate treatment depends on the clinical findings. Some conditions may be managed medically, while others may require a procedure or further referral.",
    },
  ],
},
];