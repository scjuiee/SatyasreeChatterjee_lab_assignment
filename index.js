// create questions here
var questions = [
  new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
  new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
  new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
  new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
  new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

function Question(text ,choices , answer ){
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

console.log(questions);

Question.prototype.isCorrectAnswer = function(choice){
  return choice==this.answer;

};

console.log(questions[0].isCorrectAnswer("Functions"));


function Quiz( questions){
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

var quiz=new Quiz(questions);
console.log(quiz);

Quiz.prototype.checkOptionWithAnswer= function( answer ){
 if(this.getCurrentQuestion().isCorrectAnswer(answer)){
   this.score++;
 }
 this.questionIndex++;
};

Quiz.prototype.isEnded = function(){
  return this.questions.length  === this.questionIndex;
};

Quiz.prototype.getCurrentQuestion = function(){
  return this.questions[this.questionIndex];
};


function loadQuestions(){
  if( techQuiz.isEnded() ) {
    showScore();
    return;
  }
  
  var currentQuestion = techQuiz.getCurrentQuestion();
  
  document.getElementById("question").textContent = currentQuestion.text;
  
  for( var i=0;i<currentQuestion.choices.length ;i++){
    document.getElementById('choice'+i).textContent = currentQuestion.choices[i];
    handleOptionButtonClick( 'btn' + i, currentQuestion.choices[i] );
  }

  showProgress();
}


// btnId is the id of the button. choice is the text within that button.
function handleOptionButtonClick( btnId, choice ) {
  var button = document.querySelector( '#' + btnId );
  button.onclick = function() {
    techQuiz.checkOptionWithAnswer( choice );
    loadQuestions();
  };
}

// populate the footer with a message showing the current question - for example, "Question 3 of 5"
function showProgress() {
  document.querySelector( '#progress' ).textContent = 'Question ' + ( techQuiz.questionIndex + 1 ) + ' of ' + techQuiz.questions.length;
}


function showScore() {
  // Select the #quiz element, and display the final score
  // use innerHTML (because we have to set <h1>Result</h1><div id="score">....</div>)
  document.querySelector( '#quiz' ).innerHTML = `
    <h1>Result</h1>
    <div id="score">You scored ${techQuiz.score} / ${techQuiz.questions.length}</div>
  `;
}
var techQuiz = new Quiz( questions );
loadQuestions();