/**
 * Example store structure
 *   // 5 or more questions are required
 */
const STORE = {
  questions: [
  {    
    question: 'What connects muscle to bone?',
    answers: [
      'Cartilage',
      'Ligament',
      'Tendon',
      'Meniscus'
    ],
    correctAnswer: 'Tendon'
  },
    {    
    question: 'What is the largest bone in the body?',
    answers: [
      'Femur',
      'Humerus',
      'Tibia',
      'Skull'
    ],
    correctAnswer: 'Femur'
  },
    {    
    question: 'What is the largest organ of the body?',
    answers: [
      'Skin',
      'Large Intestine',
      'Liver',
      'Lungs'
    ],
    correctAnswer: 'Skin'
  },
    {    
    question: 'What is the antaomical name for the collar bone?',    
    answers: [
      'Scapula',
      'Clavicle',
      'Sternum',
      'Patella'
    ],
    correctAnswer: 'Clavicle'
  },
    {    
    question: 'What is the smallest type of blood vessel in the body?',  
    answers: [
      'Artery',
      'Vein',
      'Capillary',
      'Alveoli'
    ],
    correctAnswer: 'Capillary'
  },
  ],
  quizStarted: false,
  currentQuestion: 0,
  score: 0
};

/**
 *
 * Your app should include a render() function, that regenerates
 * the view each time the store is updated. See your course
 * material, consult your instructor, and reference the slides
 * for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 */ 