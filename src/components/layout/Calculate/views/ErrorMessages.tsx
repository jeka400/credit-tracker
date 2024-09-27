import React from 'react';
import "../../../../styles/Calculate.css";


interface ErrorMessagesProps {
  message: string;
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ message }) => {
  return message ? <div className="error-message">{ message }</div> : null;
};

export default ErrorMessages;
