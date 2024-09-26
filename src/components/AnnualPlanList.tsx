import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { deletePayment } from '../redux/creditSlice';
import "../styles/AnnualPlanList.css";

const AnnualPlanList: React.FC = () => {
  const payments = useSelector((state: RootState) => state.credit.payments);
  const dispatch = useDispatch();

  const handleDeletePayment = (index: number) => {
    dispatch(deletePayment(index));
  };

  return (
    <ListGroup as="ol" numbered id='payments-list'>
      {payments.map((payment, index) => (
        <ListGroup.Item as="li" key={index} className="d-flex align-items-center">
          
          <div className="item-content">
            <span className='payment-date'>{payment.date}</span>
            <span className='payment-amount'>{payment.amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className='payment-curr'>RSD</span></span>
          </div>

          <Button
            variant="danger"
            onClick={() => handleDeletePayment(index)}
          >
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default AnnualPlanList;
