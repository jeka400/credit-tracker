import React, { useState } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store'; 
import { addPayment, deletePayment } from '../../../../redux/creditSlice'; 
import "../../../../styles/AnnualPlanList.css";
import "../../../../styles/CalculatedPlanList.css";

interface IInstallments {
  date: string;
  installment: number;
}

interface ICalculatedPlanListProps {
  installments: IInstallments[];
}

const CalculatedPlanList: React.FC<ICalculatedPlanListProps> = ({ installments }) => {
  const dispatch = useDispatch();
  const payments = useSelector((state: RootState) => state.credit.payments);

  const [showModal, setShowModal] = useState(false);
  const [overrideInstallment, setOverrideInstallment] = useState<IInstallments | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddInstallmentToList = (installment: IInstallments) => {
    const existingPayment = payments.find(payment => payment.date === installment.date);

    if (existingPayment) {
      setOverrideInstallment(installment);
      setShowModal(true);
    } else {
      dispatch(addPayment({
        date: installment.date,
        amount: installment.installment,
        paid: false,
      }));

      setSuccessMessage(`Payment for date ${installment.date} successfully added!`);
      setShowSuccessModal(true); 
    }
  };

  const handleConfirmOverride = () => {
    if (overrideInstallment) {
      const existingPaymentIndex = payments.findIndex(payment => payment.date === overrideInstallment.date);
      
      dispatch(deletePayment(existingPaymentIndex));

      dispatch(addPayment({
        date: overrideInstallment.date,
        amount: overrideInstallment.installment,
        paid: false,
      }));

      setSuccessMessage(`Payment for date ${overrideInstallment.date} has been overwritten!`);
      setOverrideInstallment(null);
      setShowModal(false);
      setShowSuccessModal(true); 
    }
  };

  return (
    <div>
      <ListGroup as="ol" numbered id='payments-list'>
        { installments.map((item, index) => {
          const isAdded = payments.some(payment => payment.date === item.date); 

          return (
            <ListGroup.Item
              as="li"
              key={ index }
              className={`d-flex align-items-center ${isAdded ? 'added-payment' : ''}`} 
            >
              <div className="item-content">
                <span className='payment-date'>{ item.date }</span>
                <span className='payment-amount'>
                  { item.installment.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) } 
                  <span className='payment-curr'> RSD</span>
                </span>
              </div>

              { !isAdded && (
                <Button
                  id='btn-add'
                  onClick={ () => handleAddInstallmentToList(item) }
                >
                  Add installment
                </Button>
              ) }
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      <Modal show={ showModal } onHide={ () => setShowModal(false) }>
        <Modal.Header closeButton>
          <Modal.Title>Overwrite Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A payment for this date already exists. Do you want to overwrite it?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => setShowModal(false) }>
            Cancel
          </Button>
          <Button variant="primary" onClick={ handleConfirmOverride }>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={ showSuccessModal}  onHide={ () => setShowSuccessModal(false) }>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ successMessage }</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={ () => setShowSuccessModal(false) }>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalculatedPlanList;
