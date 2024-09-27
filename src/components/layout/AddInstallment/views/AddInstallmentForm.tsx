import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { IPayment } from '../models/paymentModel';
import "../../../../styles/Add.css";

interface IAddInstallmentFormProps {
  onSubmit: (payment: IPayment) => void;
}

const AddInstallmentForm: React.FC<IAddInstallmentFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState<string>('');
  const [amount, setAmount] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount !== null && date) {
      onSubmit({ date, amount, paid: false });
      setDate('');
      setAmount(null);
    }
  };

  return (
    <Form onSubmit={ handleSubmit }>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={ date }
          onChange={ (e) => setDate(e.target.value) }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Amount (RSD)</Form.Label>
        <Form.Control
          type="number"
          placeholder="0"
          value={ amount === null ? '' : amount }
          onChange={ (e) => setAmount(e.target.value ? Number(e.target.value) : null) }
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        Add installment
      </Button>
    </Form>
  );
};

export default AddInstallmentForm;
