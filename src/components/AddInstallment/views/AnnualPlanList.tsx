import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { IPayment } from '../models/paymentModel';

interface IAnnualPlanListProps {
  payments: IPayment[];
  onDelete: (index: number) => void;
}

const AnnualPlanList: React.FC<IAnnualPlanListProps> = ({ payments, onDelete }) => {
  return (
    <ListGroup as="ol" numbered id='payments-list'>
      { payments.map((payment, index) => (
        <ListGroup.Item as="li" key={ index } className="d-flex align-items-center">
          <div className="item-content">
            <span className='payment-date'>{ payment.date }</span>
            <span className='payment-amount'>
              {payment.amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
              <span className='payment-curr'> RSD</span>
            </span>
          </div>
          
          <Button variant="danger" onClick={ () => onDelete(index) }>
            Delete
          </Button>
        </ListGroup.Item>
      )) }
    </ListGroup>
  );
};

export default AnnualPlanList;
