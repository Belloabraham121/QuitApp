import { useState } from 'react';
import { questions } from './data/questions';
import Question from './components/Question';
import OptionsList from './components/OptionsList';
import ErrorMessage from './components/ErrorMessage';
import Results from './components/Results';
import NavigationButtons from './components/NavigationButtons';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAnswer = (answer) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: answer
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

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setShowError(false);
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

  if (showResults) {
    const score = calculateScore();
    return <Results questions={questions} userAnswers={userAnswers} score={score} restartQuiz={restartQuiz} />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl mx-auto mt-8">
      <Question text={`Question ${currentQuestionIndex + 1}: ${currentQuestion.text}`} />
      <OptionsList
        options={currentQuestion.options}
        selectedOption={userAnswers[currentQuestionIndex]}
        handleAnswer={handleAnswer}
      />
      {showError && <ErrorMessage />}
      <NavigationButtons
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </div>
  );
};

export default App;
