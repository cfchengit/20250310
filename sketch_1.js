let table;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let radio;
let submitButton;
let resultP;
let questionP;
let isNextQuestion = false;

function preload() {
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#fefae0");

  // 顯示題目
  questionP = createP('');
  questionP.position(width / 2 - 250, height / 2 - 100);
  questionP.style('font-size', '30px');

  // 建立選擇題
  radio = createRadio();
  radio.position(width / 2 - 250, height / 2);
  radio.style('width', '600px');
  radio.style('font-size', '40px');
  
  // 建立送出按鈕
  submitButton = createButton('送出');
  submitButton.position(width / 2 - 120, height / 2 + 70);
  submitButton.style('font-size', '30px');
  submitButton.mousePressed(checkAnswer);

  // 建立結果顯示區域
  resultP = createP('');
  resultP.position(width / 2 - 120, height / 2 + 150);
  resultP.style('font-size', '30px');

  showQuestion();
}

function draw() {
  background("#fefae0");
  textSize(20);
  text("答對題數: " + correctCount, 10, 20);
  text("答錯題數: " + incorrectCount, 10, 40);
  text("1234567陳慶帆 ", 10, 60);
}

function showQuestion() {
  if (currentQuestionIndex < table.getRowCount()) {
    let row = table.getRow(currentQuestionIndex);
    questionP.html(row.get('question'));
    radio.option(row.get('option1'));
    radio.option(row.get('option2'));
    radio.option(row.get('option3'));
    radio.option(row.get('option4'));
    submitButton.html('送出');
    isNextQuestion = false;
  } else {
    questionP.html('測驗結束！');
    radio.hide();
    submitButton.hide();
    resultP.html(`答對題數: ${correctCount}, 答錯題數: ${incorrectCount}`);
  }
}

function checkAnswer() {
  if (isNextQuestion) {
    showQuestion();
    return;
  }

  let row = table.getRow(currentQuestionIndex);
  const answer = radio.value();
  if (answer === row.get('correct')) {
    resultP.style('color', 'green');
    resultP.html('答對了！');
    correctCount++;
  } else {
    resultP.style('color', 'red');
    resultP.html('答錯了！');
    incorrectCount++;
  }
  currentQuestionIndex++;
  submitButton.html('下一題');
  isNextQuestion = true;
}
