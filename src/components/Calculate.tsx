import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "../styles/Calculate.css";
import CalculatedPlanList from './CalculatedPlanList';

const Calculate: React.FC = () => {
  const [principal, setPrincipal] = useState<number | ''>('');
  const [months, setMonths] = useState<number | ''>('');
  const [firstPaymentMonth, setFirstPaymentMonth] = useState<number | ''>('');
  const [firstPaymentYear, setFirstPaymentYear] = useState<number | ''>('');  
  const [paymentDay, setPaymentDay] = useState<number | ''>('');  
  const [interestRate, setInterestRate] = useState<number | ''>('');
  const [euribor, setEuribor] = useState<number | ''>('');

  const [principalError, setPrincipalError] = useState('');
  const [monthsError, setMonthsError] = useState('');
  const [firstPaymentMonthError, setFirstPaymentMonthError] = useState('');
  const [firstPaymentYearError, setFirstPaymentYearError] = useState('');
  const [paymentDayError, setPaymentDayError] = useState('');
  const [interestRateError, setInterestRateError] = useState('');
  const [euriborError, setEuriborError] = useState('');
  const [installments, setInstallments] = useState<{ date: string; installment: number; }[]>([]);


  const validatePrincipal = () => {
    if (principal === '' || principal <= 0) {
      setPrincipalError('Principal must be a positive number.');
    } else {
      setPrincipalError('');
    }
  };

  const validateMonths = () => {
    if (months === '' || months <= 1) {
      setMonthsError('Number of months must be greater than 1.');
    } else {
      setMonthsError('');
    }
  };
  const validateFirstPaymentMonth = () => {
    if (firstPaymentMonth === '' || firstPaymentMonth < 1 || firstPaymentMonth > 12) {
      setFirstPaymentMonthError('First payment month must be between 1 and 12.');
    } else {
      setFirstPaymentMonthError('');
    }
  };

  const validateFirstPaymentYear = () => {
    if (firstPaymentYear === '' || firstPaymentYear < 1900) {
      setFirstPaymentYearError('Please enter a valid year.');
    } else {
      setFirstPaymentYearError('');
    }
  };

  const validatePaymentDay = () => {
    if (paymentDay === '' || paymentDay < 1 || paymentDay > 31) {
      setPaymentDayError('Payment day must be between 1 and 31.');
    } else {
      setPaymentDayError('');
    }
  };

  const validateInterestRate = () => {
    if (interestRate === '' || interestRate <= 0) {
      setInterestRateError('Interest rate must be a positive number.');
    } else {
      setInterestRateError('');
    }
  };

  const validateEuribor = () => {
    if (euribor === '' || euribor < 0) {
      setEuriborError('Euribor must be a positive number or zero.');
    } else {
      setEuriborError('');
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    validatePrincipal();
    validateMonths();
    validateFirstPaymentMonth();
    validateFirstPaymentYear();
    validatePaymentDay();
    validateInterestRate();
    validateEuribor();

    if (  typeof principal === 'number' && typeof months === 'number' && typeof firstPaymentMonth === 'number' && typeof firstPaymentYear === 'number' && typeof paymentDay === 'number' && typeof interestRate === 'number' && typeof euribor === 'number') {
      const rateList: { date: string; installment: number }[] = [];
      let remainingDebtAmount = principal; 
      let remainingMonths = months;

      for (let i = 0; i < months; i++) {
        const totalRate = interestRate + euribor; 
        const monthlyInterestRate = totalRate / 12 / 100;

        const installment = (remainingDebtAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
          (Math.pow(1 + monthlyInterestRate, months) - 1);

        const paymentDate = new Date(firstPaymentYear, firstPaymentMonth - 1 + i, paymentDay); 
        const formattedDate = paymentDate.toISOString().split('T')[0]; 

        rateList.push({ date: formattedDate, installment });

        remainingDebtAmount -= installment - (principal * monthlyInterestRate); 
      }

      setInstallments(rateList);
    }
  };

  return (
    <div className="calculate-container">
      <Form onSubmit={handleCalculate} id="calculate-form">
        
        <h3 id="calculate-title">Calculate Monthly Installments</h3>

        <Form.Group className="form-group">
          <Form.Label htmlFor="principal-input">Principal (RSD)</Form.Label>
          <Form.Control
            id="principal-input"
            type="number"
            placeholder="Enter principal"
            value={principal === '' ? '' : principal}
            onChange={(e) => setPrincipal(e.target.value ? Number(e.target.value) : '')}
            onBlur={validatePrincipal}  
          />
          {principalError && <div className="error-message">{principalError}</div>}
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label htmlFor="months-input">Number of Months</Form.Label>
          <Form.Control
            id="months-input"
            type="number"
            placeholder="Enter months"
            value={months === '' ? '' : months}
            onChange={(e) => setMonths(e.target.value ? Number(e.target.value) : '')}
            onBlur={validateMonths}  
          />
          {monthsError && <div className="error-message">{monthsError}</div>}
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label htmlFor="first-payment-month-input">First Payment Month</Form.Label>
          <Form.Control
            id="first-payment-month-input"
            type="number"
            placeholder="Enter first payment month"
            value={firstPaymentMonth === '' ? '' : firstPaymentMonth}
            onChange={ (e) => setFirstPaymentMonth(e.target.value ? Number(e.target.value) : '') }
            onBlur={ validateFirstPaymentMonth }  
          />
          { firstPaymentMonthError && <div className="error-message">{ firstPaymentMonthError }</div>}
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label htmlFor="first-payment-year-input">First Payment Year</Form.Label>
          <Form.Control
            id="first-payment-year-input"
            type="number"
            placeholder="Enter first payment year"
            value={firstPaymentYear === '' ? '' : firstPaymentYear}
            onChange={(e) => setFirstPaymentYear(e.target.value ? Number(e.target.value) : '')}
            onBlur={validateFirstPaymentYear}  
          />
          { firstPaymentYearError && <div className="error-message">{ firstPaymentYearError }</div> }
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label htmlFor="payment-day-input">Payment Day in Month</Form.Label>
          <Form.Control
            id="payment-day-input"
            type="number"
            placeholder="Enter payment day"
            value={paymentDay === '' ? '' : paymentDay}
            onChange={(e) => setPaymentDay(e.target.value ? Number(e.target.value) : '')}
            onBlur={validatePaymentDay}  
          />
          { paymentDayError && <div className="error-message">{ paymentDayError }</div> }
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label htmlFor="interest-rate-input">Interest Rate (%)</Form.Label>
          <Form.Control
            id="interest-rate-input"
            type="number"
            placeholder="Enter interest rate"
            value={interestRate === '' ? '' : interestRate}
            onChange={(e) => setInterestRate(e.target.value ? Number(e.target.value) : '')}
            onBlur={validateInterestRate}  
          />
          { interestRateError && <div className="error-message">{ interestRateError }</div> }
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label htmlFor="euribor-input">Euribor (%)</Form.Label>
          <Form.Control
            id="euribor-input"
            type="number"
            placeholder="Enter euribor"
            value={euribor === '' ? '' : euribor}
            onChange={(e) => setEuribor(e.target.value ? Number(e.target.value) : '') }
            onBlur={validateEuribor}  
          />
          { euriborError && <div className="error-message">{ euriborError }</div> }
        </Form.Group>

        <Button type="submit">Calculate</Button>
      </Form>

      <CalculatedPlanList installments={installments} />
    </div>
  );
};

export default Calculate;