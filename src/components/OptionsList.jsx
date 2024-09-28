const OptionsList = ({ options, selectedOption, handleAnswer }) => (
     <div className="space-y-4">
       {options.map((option, index) => (
         <label key={index} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
           <input
             type="radio"
             name="answer"
             value={option}
             checked={selectedOption === option}
             onChange={() => handleAnswer(option)}
             className="form-radio h-5 w-5 text-blue-600"
           />
           <span className="ml-4 text-lg">{option}</span>
         </label>
       ))}
     </div>
   );
   
   export default OptionsList;
   