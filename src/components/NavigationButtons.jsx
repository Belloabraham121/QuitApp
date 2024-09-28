import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationButtons = ({ currentQuestionIndex, totalQuestions, handlePrevious, handleNext }) => (
  <div className="flex justify-between mt-8">
    <button
      onClick={handlePrevious}
      disabled={currentQuestionIndex === 0}
      className={`flex items-center px-6 py-3 rounded-full transition-colors ${
        currentQuestionIndex === 0
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      <ChevronLeft className="mr-2 h-5 w-5" /> Previous
    </button>
    <button
      onClick={handleNext}
      className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
    >
      {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'} <ChevronRight className="ml-2 h-5 w-5" />
    </button>
  </div>
);

export default NavigationButtons;
