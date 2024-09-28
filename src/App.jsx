import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const questions = [
  {
    id: 1,
    text: "What is the smallest country in the world by land area?",
    options: ["Monaco", "San Marino", "Liechtenstein", "Vatican City"],
    correctAnswer: "Vatican City",
  },
  {
    id: 2,
    text: "Which language has the most native speakers in the world?",
    options: ["English", "Spanish", "Hindi", "Mandarin Chinese"],
    correctAnswer: "Mandarin Chinese",
  },
  {
    id: 3,
    text: "Who discovered penicillin?",
    options: [
      "Marie Curie",
      "Alexander Fleming",
      "Louis Pasteur",
      "Isaac Newton",
    ],
    correctAnswer: "Alexander Fleming",
  },
  {
    id: 4,
    text: "What is the longest river in the world?",
    options: [
      "Amazon River",
      "Nile River",
      "Yangtze River",
      "Mississippi River",
    ],
    correctAnswer: "Nile River",
  },
  {
    id: 5,
    text: "Which planet has the most moons?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter",
  },
  {
    id: 6,
    text: "What is the hardest natural substance on Earth?",
    options: ["Iron", "Diamond", "Granite", "Quartz"],
    correctAnswer: "Diamond",
  },
  {
    id: 7,
    text: "Who was the first person to set foot on the moon?",
    options: [
      "Buzz Aldrin",
      "Yuri Gagarin",
      "Neil Armstrong",
      "Michael Collins",
    ],
    correctAnswer: "Neil Armstrong",
  },
  {
    id: 8,
    text: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    correctAnswer: "Ottawa",
  },
  {
    id: 9,
    text: "Which organ in the human body is primarily responsible for pumping blood?",
    options: ["Lungs", "Heart", "Liver", "Kidneys"],
    correctAnswer: "Heart",
  },
  {
    id: 10,
    text: "What is the main ingredient in traditional Japanese sushi?",
    options: ["Rice", "Noodles", "Fish", "Seaweed"],
    correctAnswer: "Rice",
  },
];

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAnswer = (answer) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: answer,
    });
    setShowError(false);
  };

  const handleNext = () => {
    if (!userAnswers[currentQuestionIndex]) {
      setShowError(true);
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowError(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowError(false);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setShowError(false);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl mx-auto mt-8 space-y-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Quiz Results
        </h2>
        <p className="text-xl text-center mb-8">
          You scored{" "}
          <span className="font-semibold text-green-600">{score}</span> out of{" "}
          <span className="font-semibold">{questions.length}</span>!
        </p>
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="bg-gray-50 rounded-lg p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-2">{question.text}</h3>
            <div className="space-y-2">
              {question.options.map((option) => (
                <div
                  key={option}
                  className={`flex items-center p-2 rounded ${
                    option === question.correctAnswer
                      ? "bg-green-100 text-green-800"
                      : option === userAnswers[index] &&
                        option !== question.correctAnswer
                      ? "bg-red-100 text-red-800"
                      : ""
                  }`}
                >
                  {option === question.correctAnswer && (
                    <Check className="w-5 h-5 mr-2 text-green-600" />
                  )}
                  {option === userAnswers[index] &&
                    option !== question.correctAnswer && (
                      <X className="w-5 h-5 mr-2 text-red-600" />
                    )}
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-8">
          <button
            onClick={restartQuiz}
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="mr-2 h-5 w-5" /> Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Question {currentQuestionIndex + 1}
      </h2>
      <p className="mb-6 text-xl text-center">{currentQuestion.text}</p>
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <label
            key={index}
            className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <input
              type="radio"
              name="answer"
              value={option}
              checked={userAnswers[currentQuestionIndex] === option}
              onChange={() => handleAnswer(option)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-4 text-lg">{option}</span>
          </label>
        ))}
      </div>
      {showError && (
        <div className="flex items-center mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>
            Please select an answer before moving to the next question.
          </span>
        </div>
      )}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`flex items-center px-6 py-3 rounded-full transition-colors ${
            currentQuestionIndex === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Previous
        </button>
        <button
          onClick={handleNext}
          className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}{" "}
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default QuizApp;
