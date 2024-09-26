import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPayment, selectPayments, deletePayment } from '../../../redux/creditSlice';
import AddInstallmentForm from '../views/AddInstallmentForm';
import ConfirmationModal from '../views/ConfirmationModal';
import SuccessErrorModal from '../views/SuccessErrorModal';
import { IPayment } from '../models/paymentModel';
import "../../../styles/Add.css";
import { Container } from 'react-bootstrap';
import AnnualPlanList from '../views/AnnualPlanList';

const AddInstallmentController: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string }>({ title: '', message: '' });
  const [existingPayment, setExistingPayment] = useState<IPayment | null>(null);

  const dispatch = useDispatch();

  const payments = useSelector(selectPayments);

  const checkExistingPayment = (date: string) => {
    return payments.find((payment: IPayment) => payment.date === date);
  };

  const handleAddInstallment = (payment: IPayment) => {
    const existing = checkExistingPayment(payment.date);
    if (existing) {
      setExistingPayment(existing);
      setShowConfirmation(true);
    } else {
      dispatch(addPayment(payment));
      setModalContent({ title: 'Success', message: `Installment for date ${ payment.date } with amount ${payment.amount} RSD is successfully added!` });
      setShowModal(true);
    }
  };

  const handleOverride = () => { // TEMPORARY SOLUTION
    if (existingPayment) {
      dispatch(addPayment({ ...existingPayment, amount: existingPayment.amount }));
      setModalContent({ title: 'Success', message: `Installment, ${ existingPayment.date }, has been add! Be aware that there are multiple intallments for the same month!` });
      setShowModal(true);
      setShowConfirmation(false);
      setExistingPayment(null);
    }
  };

  const handleDeletePayment = (index: number) => {
    dispatch(deletePayment(index));
  };

  return (
    <Container className='add-container'>
      <div className='add-form'>

        <h3>Add new installment</h3>
        
        <AddInstallmentForm onSubmit={ handleAddInstallment } />

        <ConfirmationModal 
          show={ showConfirmation } 
          onHide={ () => setShowConfirmation(false) } 
          onConfirm={ handleOverride } 
        />

      </div>

      <div>
          <AnnualPlanList payments={ payments } onDelete={ handleDeletePayment } />
      </div>

        <SuccessErrorModal 
          show={ showModal } 
          title={ modalContent.title } 
          message={ modalContent.message } 
          onHide={ () => setShowModal(false) } 
        />
    </Container>
  );
};

export default AddInstallmentController;
