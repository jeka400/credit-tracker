import React, { useState } from 'react';
import { IInstallment, calculateInstallments } from '../models/calculateModel';
import CalculateForm from '../views/CalculateForm';
import CalculatedPlanList from '../views/CalculatedPlanList';
import "../../../../styles/Calculate.scss";

const CalculateController: React.FC = () => {
  const [installments, setInstallments] = useState<IInstallment[]>([]);

  const handleCalculate = (data: {
    principal: number;
    months: number;
    firstPaymentMonth: number;
    firstPaymentYear: number;
    paymentDay: number;
    interestRate: number;
    euribor: number;
  }) => {
    const result = calculateInstallments(
      data.principal,
      data.months,
      data.interestRate,
      data.euribor,
      data.firstPaymentMonth,
      data.firstPaymentYear,
      data.paymentDay
    );
    setInstallments(result);
  };

  return (
    <div className="calculate-container">
      <CalculateForm onCalculate={ handleCalculate } />
      <CalculatedPlanList installments={ installments } />
    </div>
  );
};

export default CalculateController;
