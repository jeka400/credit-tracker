import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col, Container, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addPayment, selectPayments } from '../redux/creditSlice';
import AnnualPlanList from './AnnualPlanList';
import "../styles/Add.css";

export interface IPayments {
  date: string; 
  amount: number; 
  paid: boolean; 
}

const AddInstallment: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [amount, setAmount] = useState<number | null>(null); 
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [existingPayment, setExistingPayment] = useState<{ date: string; amount: number } | null>(null);
  
  const [showModal, setShowModal] = useState<boolean>(false); // State for modal visibility
  const [modalContent, setModalContent] = useState<{ title: string; message: string }>({ title: '', message: '' });

  const dispatch = useDispatch();

  const payments = useSelector(selectPayments);

  const validateDate = (inputDate: string) => {
    const dateRegex = /^(19[9][0-9]|20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return dateRegex.test(inputDate);
  };

  const checkExistingPayment = (date: string) => {
    const [year, month] = date.split('-');
    return payments.find((payment: IPayments) => {
      const paymentDate = payment.date.split('-');
      return paymentDate[0] === year && paymentDate[1] === month;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount !== null && date) {
      if (!validateDate(date)) {
        setModalContent({ title: 'Error', message: 'Invalid date! Date must be with valid day, month, and year.' });
        setShowModal(true);
        return;
      }

      if (amount <= 0) {
        setModalContent({ title: 'Error', message: 'Amount must be greater than zero.' });
        setShowModal(true);
        return;
      }

      const existing = checkExistingPayment(date);
      if (existing) {
        setExistingPayment(existing);
        setShowConfirmation(true);
      } else {
        dispatch(addPayment({ date, amount, paid: false }));
        setModalContent({ title: 'Success', message: `Installment for date ${date} with amount ${amount} RSD is successfully added!` });
        setShowModal(true);
        resetForm();
      }
    }
  };

  const handleOverride = () => {
    if (existingPayment) {
      dispatch(addPayment({ date, amount: existingPayment.amount, paid: false })); 
      setModalContent({ title: 'Success', message: `Installment for date ${date} with amount ${amount} RSD has been added!` });
      setShowModal(true);
      resetForm();
      setShowConfirmation(false);
      setExistingPayment(null); 
    }
  };

  const resetForm = () => {
    setDate('');
    setAmount(null); 
    setErrorMessage(null);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <Container className='add-container'>
      <div className='add-form'>
        <h3>Add new installment</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Amount (RSD)</Form.Label>
            <Form.Control
              type="number"
              placeholder="0"
              value={amount === null ? '' : amount}
              onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : null)} 
            />
          </Form.Group>
          
          <Button type="submit" variant="primary">
            Add installment
          </Button>
        </Form>

        {showConfirmation && (
          <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              A installment already exists for this month and year. Do you want to add new?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleOverride}>Yes</Button>
              <Button variant="danger" onClick={() => setShowConfirmation(false)}>No</Button>
            </Modal.Footer>
          </Modal>
        )}

      </div>

      <div>
        <AnnualPlanList />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddInstallment;
