// Variables configurables
let numQuestions = 20; // Valor por defecto, se ajustará según la selección del usuario
let questions = [];
let selectedQuestions = []; // Preguntas seleccionadas aleatoriamente
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = []; // Registro de respuestas del usuario

// Referencias a elementos
const startContainer = document.getElementById("start-container");
const numQuestionsSelect = document.getElementById("num-questions");
const modeButtons = document.querySelectorAll(".mode-btn");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");

// Mapear modos a archivos JSON
const modeFiles = {
  images: "questions_image.json",
  "multiple-choice": "questions_multiple_choice.json",
  mixed: "questions.json"
};

// Seleccionar el modo del quiz
modeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const mode = button.getAttribute("data-mode");
    numQuestions = parseInt(numQuestionsSelect.value, 10); // Leer el número de preguntas seleccionado
    const file = modeFiles[mode];
    loadQuestions(file);
  });
});

// Cargar preguntas desde el archivo JSON
function loadQuestions(file) {
  fetch(file)
    .then(response => response.json())
    .then(data => {
      questions = data;
      startQuiz();
    })
    .catch(error => console.error('Error al cargar las preguntas:', error));
}

// Seleccionar preguntas aleatoriamente
function selectRandomQuestions() {
  const shuffled = questions.sort(() => Math.random() - 0.5); // Barajar preguntas
  return shuffled.slice(0, numQuestions); // Seleccionar las primeras `numQuestions`
}

// Iniciar el quiz
function startQuiz() {
  startContainer.style.display = "none"; // Ocultar pantalla de inicio
  quizContainer.style.display = "block"; // Mostrar el quiz

  currentQuestionIndex = 0;
  score = 0;
  userAnswers = []; // Limpiar respuestas anteriores
  selectedQuestions = selectRandomQuestions(); // Obtener preguntas aleatorias
  showQuestion();
}

// Mostrar pregunta
function showQuestion() {
  questionContainer.innerHTML = ""; // Limpiar contenido anterior
  const question = selectedQuestions[currentQuestionIndex];

  const questionText = document.createElement("h2");
  questionText.textContent = question.question;
  questionContainer.appendChild(questionText);

  if (question.type === "image") {
    const img = document.createElement("img");
    img.src = question.image;
    img.alt = "Imagen de la especie";
    img.style.maxWidth = "100%";
    questionContainer.appendChild(img);

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Escribe tu respuesta aquí";
    input.id = "answer-input";
    questionContainer.appendChild(input);

    input.addEventListener("input", () => {
      nextBtn.disabled = !input.value.trim();
    });

    nextBtn.onclick = () => {
      const userAnswer = input.value.trim();
      checkAnswer(userAnswer);
    };

  } else if (question.type === "multiple-choice") {
    question.options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.className = "option-btn";
      button.onclick = () => checkAnswer(option);
      questionContainer.appendChild(button);
    });
  }
}

// Validar respuesta
function checkAnswer(userAnswer) {
  const question = selectedQuestions[currentQuestionIndex];
  const correctAnswer = question.correctAnswer;

  // Guardar respuesta del usuario
  userAnswers.push({
    question: question.question,
    userAnswer: userAnswer,
    correctAnswer: correctAnswer,
    isCorrect: userAnswer.toLowerCase() === correctAnswer.toLowerCase(),
    image: question.image // Guardar la imagen asociada
  });

  // Actualizar puntuación
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < selectedQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Mostrar resultados
function showResults() {
  questionContainer.innerHTML = `
    <h2>¡Quiz finalizado!</h2>
    <p>Tu puntuación: ${score} / ${selectedQuestions.length}</p>
    <h3>Detalles de tus respuestas:</h3>
  `;

  const resultList = document.createElement("ul");
  userAnswers.forEach((answer, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
  <strong>Pregunta ${index + 1}:</strong> ${answer.question} <br>
  <strong>Tu respuesta:</strong> ${answer.userAnswer || "No respondida"} <br>
  <strong>Respuesta correcta:</strong> <a href="#" class="correct-answer" data-image="${answer.image}">${answer.correctAnswer}</a> <br>
  <strong>Estado:</strong> ${answer.isCorrect ? "✔️ Correcta" : "❌ Incorrecta"}
  <strong></strong>
`;

    resultList.appendChild(listItem);
  });

  questionContainer.appendChild(resultList);

  document.querySelectorAll(".correct-answer").forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const imageUrl = event.target.getAttribute("data-image"); // Accede al atributo `data-image`
      if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "Imagen de la planta";
        img.style.maxWidth = "100%";
        questionContainer.appendChild(img);
      }
    });
  });
  

  nextBtn.style.display = "none";
}
