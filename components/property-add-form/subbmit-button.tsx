'use client';

import { useFormStatus } from 'react-dom';


 const SubmitButton = () => {
  const { pending } = useFormStatus();
  
  return (
    <button
      disabled={pending}
      className={`${
        pending ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
      } text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline`}
      type="submit"
    >
      {pending ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Adding Property...
        </span>
      ) : (
        'Add Property'
      )}
    </button>
  );
};

export default SubmitButton;