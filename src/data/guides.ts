export interface Guide {
  slug: string;
  category: string;
  title: string;
  introduction: string;
  overview: string;
  sections: {
    title: string;
    content: string;
  }[];
  whenToSeekCare: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const guides: Guide[] = [
  {
    slug: "ear",
    category: "Ear",
    title: "Understanding common ear concerns",
    introduction:
      "A practical overview of common ear symptoms, hearing concerns and situations where an ENT evaluation may be appropriate.",
    overview:
      "Ear symptoms can have different causes. Pain, blockage, discharge, changes in hearing and other symptoms should be considered alongside their duration, severity and associated symptoms.",
    sections: [
      {
        title: "Common concerns",
        content:
          "People may seek ENT advice for ear pain, a blocked sensation, discharge, recurrent ear infections, ringing in the ears or changes in hearing.",
      },
      {
        title: "Why evaluation matters",
        content:
          "An ENT assessment can help identify the relevant structures involved and determine whether further examination or diagnostic testing is appropriate.",
      },
      {
        title: "What to expect",
        content:
          "A consultation may include a discussion of symptoms and medical history followed by an examination of the ears and other relevant ENT structures.",
      },
    ],
    whenToSeekCare: [
      "Persistent or recurrent ear pain",
      "A noticeable change in hearing",
      "Repeated ear discharge or infections",
      "A persistent blocked sensation",
      "Ear symptoms that are affecting everyday activities",
    ],
    faqs: [
      {
        question: "When should I see an ENT for an ear problem?",
        answer:
          "Persistent, recurrent or troublesome ear symptoms may warrant an ENT evaluation, particularly when they affect hearing or daily activities.",
      },
      {
        question: "Will every ear concern require a procedure?",
        answer:
          "No. The appropriate approach depends on the clinical findings and the individual concern. An evaluation helps determine the next step.",
      },
    ],
  },

  {
    slug: "nose-sinus",
    category: "Nose & Sinus",
    title: "Understanding nasal and sinus concerns",
    introduction:
      "Learn about common nasal and sinus symptoms, including blockage, allergy-related concerns and symptoms that may need specialist evaluation.",
    overview:
      "Nasal symptoms can arise from several different causes. Understanding the pattern and persistence of symptoms can help guide an appropriate clinical evaluation.",
    sections: [
      {
        title: "Common concerns",
        content:
          "Nasal blockage, sneezing, nasal allergies, recurrent sinus symptoms, reduced sense of smell and related discomfort are common reasons people seek ENT care.",
      },
      {
        title: "Looking at the bigger picture",
        content:
          "Symptoms may need to be considered together rather than in isolation. A clinician can assess the nose, sinuses and related ENT structures to understand the concern more clearly.",
      },
      {
        title: "Evaluation",
        content:
          "Depending on the symptoms, evaluation may include a clinical examination and, when appropriate, additional diagnostic assessment.",
      },
    ],
    whenToSeekCare: [
      "Persistent nasal blockage",
      "Recurrent or troublesome sinus symptoms",
      "Ongoing nasal allergy symptoms",
      "Persistent reduction in smell",
      "Symptoms that continue despite previous treatment",
    ],
    faqs: [
      {
        question: "Can allergies cause persistent nasal symptoms?",
        answer:
          "Allergy-related conditions can contribute to nasal symptoms. An appropriate evaluation can help determine whether allergy is relevant to the individual concern.",
      },
      {
        question: "Does nasal blockage always mean sinus disease?",
        answer:
          "No. Nasal blockage can have different causes, which is why persistent symptoms may benefit from clinical evaluation.",
      },
    ],
  },

  {
    slug: "vertigo",
    category: "Vertigo & Balance",
    title: "Understanding vertigo and balance concerns",
    introduction:
      "A clear introduction to dizziness, positional symptoms, balance concerns and why appropriate evaluation matters.",
    overview:
      "Dizziness and vertigo can describe different experiences. The timing, triggers, associated symptoms and clinical history can all be important when evaluating these concerns.",
    sections: [
      {
        title: "Vertigo and dizziness",
        content:
          "Some people describe a spinning sensation, while others experience imbalance, light-headedness or movement-related symptoms. These experiences can have different causes.",
      },
      {
        title: "What evaluation involves",
        content:
          "An ENT assessment may consider the history of the symptoms, ear examination, balance assessment, positional testing and other relevant clinical findings.",
      },
      {
        title: "Why the pattern matters",
        content:
          "When dizziness occurs, how long it lasts and what triggers it can provide useful information during a clinical evaluation.",
      },
    ],
    whenToSeekCare: [
      "Recurrent episodes of vertigo or dizziness",
      "Dizziness triggered by changes in position",
      "Balance difficulties",
      "Dizziness associated with ear symptoms",
      "Symptoms that are recurring or affecting daily activities",
    ],
    faqs: [
      {
        question: "Is every dizzy spell vertigo?",
        answer:
          "No. Dizziness can describe several different sensations. A clinical assessment can help clarify what type of symptom you are experiencing.",
      },
      {
        question: "Why does the doctor ask when dizziness happens?",
        answer:
          "The timing, duration and triggers of symptoms can provide useful information when evaluating balance and vestibular concerns.",
      },
    ],
  },

  {
    slug: "throat-voice",
    category: "Throat & Voice",
    title: "Understanding throat and voice concerns",
    introduction:
      "Helpful information about common throat and voice symptoms and when specialist assessment may be appropriate.",
    overview:
      "Throat and voice symptoms can range from temporary irritation to persistent concerns that need further evaluation. The duration and associated symptoms are important.",
    sections: [
      {
        title: "Common concerns",
        content:
          "People may seek ENT care for persistent throat discomfort, swallowing difficulties, voice changes, recurrent throat symptoms or other concerns involving the throat and voice.",
      },
      {
        title: "Voice changes",
        content:
          "A persistent change in voice may require examination of the relevant throat and voice structures to understand the underlying concern.",
      },
      {
        title: "Swallowing concerns",
        content:
          "Difficulty or discomfort while swallowing can have different causes. Persistent symptoms should be discussed with an appropriate healthcare professional.",
      },
    ],
    whenToSeekCare: [
      "Persistent changes in voice",
      "Ongoing throat discomfort",
      "Difficulty or discomfort while swallowing",
      "Recurrent throat symptoms",
      "Symptoms that are persistent or worsening",
    ],
    faqs: [
      {
        question: "When should a voice change be evaluated?",
        answer:
          "A persistent or troublesome change in voice may warrant an ENT evaluation, particularly when it does not settle or is accompanied by other symptoms.",
      },
      {
        question: "Can swallowing difficulty have different causes?",
        answer:
          "Yes. Swallowing concerns can have different causes, so persistent symptoms should be evaluated rather than assumed to have one specific explanation.",
      },
    ],
  },
];