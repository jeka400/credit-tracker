import React, {  useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ErrorMessages from './ErrorMessages';
import "../../../styles/Calculate.css";

interface CalculateFormProps {
  onCalculate: (data: {
    principal: number;
    months: number;
    firstPaymentMonth: number;
    firstPaymentYear: number;
    paymentDay: number;
    interestRate: number;
    euribor: number;
  }) => void;
}

const CalculateForm: React.FC<CalculateFormProps> = ({ onCalculate }) => {
  const [principal, setPrincipal] = useState<number | ''>('');
  const [months, setMonths] = useState<number | ''>('');
  const [firstPaymentMonth, setFirstPaymentMonth] = useState<number | ''>('');
  const [firstPaymentYear, setFirstPaymentYear] = useState<number | ''>('');
  const [paymentDay, setPaymentDay] = useState<number | ''>('');
  const [interestRate, setInterestRate] = useState<number | ''>('');
  const [euribor, setEuribor] = useState<number | ''>('');

  const [errors, setErrors] = useState({
    principalError: '',
    monthsError: '',
    firstPaymentMonthError: '',
    firstPaymentYearError: '',
    paymentDayError: '',
    interestRateError: '',
    euriborError: '',
  });

  const validateFields = () => {
    const newErrors = {
      principalError: principal === '' || principal <= 0 ? 'Principal must be a positive number.' : '',
      monthsError: months === '' || months <= 1 ? 'Number of months must be greater than 1.' : '',
      firstPaymentMonthError:
        firstPaymentMonth === '' || firstPaymentMonth < 1 || firstPaymentMonth > 12
          ? 'First payment month must be between 1 and 12.'
          : '',
      firstPaymentYearError: firstPaymentYear === '' || firstPaymentYear < 1900 ? 'Please enter a valid year.' : '',
      paymentDayError: paymentDay === '' || paymentDay < 1 || paymentDay > 31 ? 'Payment day must be between 1 and 31.' : '',
      interestRateError: interestRate === '' || interestRate <= 0 ? 'Interest rate must be a positive number.' : '',
      euriborError: euribor === '' || euribor < 0 ? 'Euribor must be a positive number or zero.' : '',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      onCalculate({
        principal: Number(principal),
        months: Number(months),
        firstPaymentMonth: Number(firstPaymentMonth),
        firstPaymentYear: Number(firstPaymentYear),
        paymentDay: Number(paymentDay),
        interestRate: Number(interestRate),
        euribor: Number(euribor),
      });
    }
  };

  return (
    <Form onSubmit={ handleSubmit } id="calculate-form">
      <h3 id="calculate-title">Calculate Monthly Installments</h3>

      <Form.Group className="form-group">
        <Form.Label htmlFor="principal-input">Principal (RSD)</Form.Label>
        <Form.Control
          id="principal-input"
          type="number"
          placeholder="Enter principal"
          value={ principal === '' ? '' : principal  }
          onChange={ (e) => setPrincipal(e.target.value ? Number(e.target.value) : '')}
        />
        <ErrorMessages message={ errors.principalError } />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label htmlFor="months-input">Number of Months</Form.Label>
        <Form.Control
          id="months-input"
          type="number"
          placeholder="Enter months"
          value={ months === '' ? '' : months }
          onChange={ (e) => setMonths(e.target.value ? Number(e.target.value) : '') }
        />
        <ErrorMessages message={ errors.monthsError } />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label htmlFor="first-payment-month-input">First Payment Month</Form.Label>
        <Form.Control
          id="first-payment-month-input"
          type="number"
          placeholder="Enter first payment month"
          value={ firstPaymentMonth === '' ? '' : firstPaymentMonth }
          onChange={ (e) => setFirstPaymentMonth(e.target.value ? Number(e.target.value) : '') }
        />
        <ErrorMessages message={ errors.firstPaymentMonthError } />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label htmlFor="first-payment-year-input">First Payment Year</Form.Label>
        <Form.Control
          id="first-payment-year-input"
          type="number"
          placeholder="Enter first payment year"
          value={ firstPaymentYear === '' ? '' : firstPaymentYear }
          onChange={ (e) => setFirstPaymentYear(e.target.value ? Number(e.target.value) : '') }
        />
        <ErrorMessages message={ errors.firstPaymentYearError } />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label htmlFor="payment-day-input">Payment Day in Month</Form.Label>
        <Form.Control
          id="payment-day-input"
          type="number"
          placeholder="Enter payment day"
          value={ paymentDay === '' ? '' : paymentDay }
          onChange={ (e) => setPaymentDay(e.target.value ? Number(e.target.value) : '') }
        />
        <ErrorMessages message={ errors.paymentDayError } />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label htmlFor="interest-rate-input">Interest Rate (%)</Form.Label>
        <Form.Control
          id="interest-rate-input"
          type="number"
          placeholder="Enter interest rate"
          value={ interestRate === '' ? '' : interestRate }
          onChange={ (e) => setInterestRate(e.target.value ? Number(e.target.value) : '') }
        />
        <ErrorMessages message={ errors.interestRateError  } />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label htmlFor="euribor-input">Euribor (%)</Form.Label>
        <Form.Control
          id="euribor-input"
          type="number"
          placeholder="Enter euribor"
          value={ euribor === '' ? '' : euribor }
          onChange={ (e) => setEuribor(e.target.value ? Number(e.target.value) : '') }
        />
        <ErrorMessages message={ errors.euriborError } />
      </Form.Group>

      <Button type="submit">Calculate</Button>
    </Form>
  );
};

export default CalculateForm;
