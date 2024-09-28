import { Check, X, RefreshCw } from 'lucide-react';

const Results = ({ questions, userAnswers, score, restartQuiz }) => (
  <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl mx-auto mt-8 space-y-6">
    <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Quiz Results</h2>
    <p className="text-xl text-center mb-8">
      You scored <span className="font-semibold text-green-600">{score}</span> out of <span className="font-semibold">{questions.length}</span>!
    </p>
    {questions.map((question, index) => (
      <div key={question.id} className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">{question.text}</h3>
        <div className="space-y-2">
          {question.options.map((option) => (
            <div key={option} className={`flex items-center p-2 rounded ${
              option === question.correctAnswer 
                ? 'bg-green-100 text-green-800' 
                : option === userAnswers[index] && option !== question.correctAnswer
                  ? 'bg-red-100 text-red-800'
                  : ''
            }`}>
              {option === question.correctAnswer && <Check className="w-5 h-5 mr-2 text-green-600" />}
              {option === userAnswers[index] && option !== question.correctAnswer && <X className="w-5 h-5 mr-2 text-red-600" />}
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

export default Results;
