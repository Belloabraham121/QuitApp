import { AlertCircle } from 'lucide-react';

const ErrorMessage = () => (
  <div className="flex items-center mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
    <AlertCircle className="w-5 h-5 mr-2" />
    <span>Please select an answer before moving to the next question.</span>
  </div>
);

export default ErrorMessage;
