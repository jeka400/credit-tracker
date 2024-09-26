import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import "../styles/Home.css";
import "../styles/Footer.css";
import { Container } from 'react-bootstrap';


const Footer: React.FC = () => {
  const payments = useSelector((state: RootState) => state.credit.payments);

  const totalAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);
  const totalPaid = payments.reduce((acc, payment) => (payment.paid ? acc + payment.amount : acc), 0);

  return (
    <div className="fixed-footer">
      <Container>
        <h2 className='payment-amount'>
          Total Amount: 
          <span className='payment-number'>
            { totalAmount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
          </span> 
          <span className='payment-curr'> RSD</span>
        </h2>

        <hr />

        <h2 className='payment-amount'>
          Total Paid: 
          <span className='payment-number'>
              { totalPaid.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
          </span> 
          <span className='payment-curr'> RSD</span>
        </h2>
      </Container>
       
    </div>
  );
};

export default Footer;
