import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Payment } from '../models/annualPlanModel';
import "../../../../styles/Home.scss";
import "../../../../styles/AnnualPlanList.scss";

interface IAnnualPlanProgressBarProps {
  payments: Payment[];
}

const AnnualPlanProgressBar: React.FC<IAnnualPlanProgressBarProps> = ({ payments }) => {
  const totalAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);
  const paidAmount = payments.filter(payment => payment.paid).reduce((acc, payment) => acc + payment.amount, 0); 
  const progress = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0; 

  return (
    <div className="progress-container">
      <img src="/images/bridge.jpg" alt="Bridge" className="left-image" />

      <ProgressBar now={ progress } label={ `${progress.toFixed(2)}%` } variant='success' className="progress-bar" />
      
      <img src="/images/house.jpg" alt="House" className="right-image" />
    </div>
  );
};

export default AnnualPlanProgressBar;
