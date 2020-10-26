/*Generate functions*/

/* Generates HTML for start screen  */

function generateStartScreenHtml() {
  return `
    <div class="start-screen">
      <p>This quiz is on basic human anatomy.</p>
      <button type="button" id="start">Press here to start quiz</button>
    </div>
  `;
}

/* Generates the HTML question count and the score */
 
 function generateQuestionNumberAndScoreHtml() {
  return `
    <ul class="question-and-score">
      <li id="question-number">
        You are on question number: ${STORE.currentQuestion + 1}/${STORE.questions.length}
      </li>
      <li id="score">
        You currently have: ${STORE.score}/${STORE.questions.length} correct
      </li>
    </ul>
  `;
}

/* Generates the list of multiple choice answers for one problem */

function generateAnswersHtml() {
  const answersArray = STORE.questions[STORE.currentQuestion].answers
  let answersHtml = '';
  let i = 0;

  answersArray.forEach(answer => {
    answersHtml += `
      <div id="option-container-${i}">
        <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
        <label for="option${i + 1}"> ${answer}</label>
      </div>
    `;
    i++;
  });
  return answersHtml;
}

/* Generates the HTML to display one question */

function generateQuestionHtml() {
  let currentQuestion = STORE.questions[STORE.currentQuestion];
  return `
    <form id="question-form" class="question-form">
    <fieldset>
      <div class="container">
        <div class="question">
          <legend> ${currentQuestion.question}</legend>
        </div>
        <div class="options">
          <div class="answers">
            ${generateAnswersHtml()}
          </div>
        </div>
        <button type="submit" id="submit-answer-btn" tabindex="5">Submit</button>
        <button type="button" id="next-question-btn" tabindex="6"> Next Question</button>
      </div>
      </fieldset>
    </form >
  `;
}

/* Generates the HTML for the results screen */

function generateResultsScreen() {
  return `
    <div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div>
            <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
          </div>
        
          <div>
            <button type="button" id="restart"> Click here to restart quiz </button>
          </div>
        </fieldset>
    </form>
    </div>
  `;
}

/* HTML providing the user with feedback on answer choice */

function generateFeedbackHtml(answerStatus) {
  let correctAnswer = STORE.questions[STORE.currentQuestion].correctAnswer;
  let html = '';
  if (answerStatus === 'correct') {
    html = `
    <div class="right-answer">That is correct!</div>
    `;
  }
  else if (answerStatus === 'incorrect') {
    html = `
      <div class="wrong-answer">That is incorrect.<br>The correct answer is ${correctAnswer}.</div>
    `;
  }
  return html;
}

/* RENDER FUNCTION */

function render() {
  let html = '';

  if (STORE.quizStarted === false) {
    $('main').html(generateStartScreenHtml());
    return;
  }
  else if (STORE.currentQuestion >= 0 && STORE.currentQuestion < STORE.questions.length) {
    html = generateQuestionNumberAndScoreHtml();
    html += generateQuestionHtml();
    $('main').html(html);
  }
  else {
    $('main').html(generateResultsScreen());
  }
}

/* EVENT HANDLER FUNCTIONS */

/* Handles a click of start button  */

function handleStartClick() {
  $('main').on('click', '#start', function (event) {
    STORE.quizStarted = true;
    render();
  });
}

/* Handles the click of next button  */

function handleNextQuestionClick() {
  $('body').on('click', '#next-question-btn', (event) => {
    render();
  });
}

/* Handles the submission of the question form  */

function handleQuestionFormSubmission() {
  $('body').on('submit', '#question-form', function (event) {
    event.preventDefault();
    const currentQuestion = STORE.questions[STORE.currentQuestion];

    let selectedOption = $('input[name=options]:checked').val();
  
    let optionContainerId = `#option-container-${currentQuestion.answers.findIndex(i => i === selectedOption)}`;

    if (selectedOption === currentQuestion.correctAnswer) {
      STORE.score++;
      $(optionContainerId).append(generateFeedbackHtml('correct'));
    }
    else {
      $(optionContainerId).append(generateFeedbackHtml('incorrect'));
    }
    STORE.currentQuestion++;
   
    $('#submit-answer-btn').hide();

    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });

    $('#next-question-btn').show();

  });
}

/* Resets all values to prepare to restart quiz  */

function restartQuiz() {
  STORE.quizStarted = false;
  STORE.currentQuestion = 0;
  STORE.score = 0;
}

function handleRestartButtonClick() {
  $('body').on('click', '#restart', () => {
    restartQuiz();
    render();
  });
}

/* Run App */

function handleQuizApp() {
  render();
  handleStartClick();
  handleNextQuestionClick();
  handleQuestionFormSubmission();
  handleRestartButtonClick();
}

$(handleQuizApp);