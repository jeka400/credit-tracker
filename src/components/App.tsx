import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setPayments } from '../redux/creditSlice';
import Layout from './Layout';
import Add from './AddInstallment';
import Euribor from './Euribor';
import AnnualPlan from './AnnualPlan';
import Calculate from './Calculate';
import { Modal, Button } from 'react-bootstrap';
import "../styles/App.css";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state: RootState) => state.credit.payments);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string }>({ title: '', message: '' });

  useEffect(() => {
    const storedPayments = localStorage.getItem('payments');

    if (storedPayments) {
      const parsedPayments = JSON.parse(storedPayments);
      dispatch(setPayments(parsedPayments));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const upcomingPayment = payments.find((payment) => {
      const paymentDate = new Date(payment.date);
      return paymentDate.toDateString() === tomorrow.toDateString() && !payment.paid;
    });

    if (upcomingPayment) {
      setModalContent({ title: 'Reminder', message: `Payment due on ${upcomingPayment.date} is tomorrow!` });
      setShowModal(true);
    }
  }, [payments]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AnnualPlan />} />
          <Route path="/add" element={<Add />} />
          <Route path="/euribor" element={<Euribor />} />
          <Route path="/calculate" element={<Calculate />} /> 
        </Routes>
      </Layout>

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
    </Router>
  );
};

export default App;
