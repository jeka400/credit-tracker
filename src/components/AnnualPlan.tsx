import React from 'react';
import { Table, Button, ProgressBar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { togglePaid, editPayment } from '../redux/creditSlice';
import "../styles/Home.css";
import "../styles/AnnualPlanList.css";

const AnnualPlan: React.FC = () => {
  const payments = useSelector((state: RootState) => state.credit.payments);
  const totalAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);
  const paidAmount = payments.filter(payment => payment.paid).reduce((acc, payment) => acc + payment.amount, 0); 
  const dispatch = useDispatch();

  const handleTogglePaid = (index: number) => {
    dispatch(togglePaid(index));
  };

  const handleEditPayment = (index: number) => {
    const newAmount = prompt('Insert new amount for payment:', `${payments[index].amount}`);
    if (newAmount) {
      dispatch(editPayment({ index, amount: Number(newAmount) }));
    }
  };

  const progress = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0; 

  return (
    <div className="home-container">
      <div className="table-container">
        <Table striped bordered hover id='home-table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount (RSD)</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td className={payment.paid ? 'paid-td payment-date-table' : "payment-date-table"}>{payment.date}</td>
                
                <td className={payment.paid ? 'paid-td payment-amount' : "payment-amount"}>{payment.amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className='payment-curr'>RSD</span></td>

                <td className={payment.paid ? 'paid-td' : ""}>{payment.paid ? 'Paid' : 'Not Paid'}</td>
                
                <td className={payment.paid ? 'paid-td' : ""}>
                  <Button className={payment.paid ? "paid-edit-btn" : "mr-2"} onClick={() => handleEditPayment(index)}>
                    Edit amount
                  </Button>
                </td>
                
                <td className={payment.paid ? 'paid-td' : ""}>
                  <Button className={ payment.paid ? 'success' : 'warning'} onClick={() => handleTogglePaid(index)}>
                    { payment.paid ? 'Set as NOT Paid' : 'Set as PAID' }
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="progress-container">
        <img src="/images/bridge.jpg" alt="Bridge" className="left-image" />

        <ProgressBar now={progress} label={`${progress.toFixed(2)}%`} variant='success' className="progress-bar" />

        <img src="/images/house.jpg" alt="House" className="right-image" />
      </div>
    </div>
  );
};

export default AnnualPlan;
