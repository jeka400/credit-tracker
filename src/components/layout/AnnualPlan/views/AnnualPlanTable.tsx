import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Payment } from '../models/annualPlanModel';
import "../../../../styles/Home.scss";
import "../../../../styles/AnnualPlanList.scss";

interface IAnnualPlanTableProps {
  payments: Payment[];
  onTogglePaid: (index: number) => void;
  onEditPayment: (index: number) => void;
}

const AnnualPlanTable: React.FC<IAnnualPlanTableProps> = ({ payments, onTogglePaid, onEditPayment }) => {
  return (
    <div className='home-container'>
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
              <tr key={ index }>
                <td className={ payment.paid ? 'paid-td payment-date-table' : "payment-date-table" }>{ payment.date }</td>
                
                <td className={ payment.paid ? 'paid-td payment-amount' : "payment-amount" }>
                  {payment.amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                  <span className='payment-curr'> RSD</span>
                </td>
                
                <td className={ payment.paid ? 'paid-td' : "" }>{ payment.paid ? 'Paid' : 'Not Paid' }</td>
                
                <td className={ payment.paid ? 'paid-td' : "" }>
                  <Button className={payment.paid ? "paid-edit-btn" : "mr-2" } onClick={ () => onEditPayment(index) }>
                    Edit amount
                  </Button>
                </td>
                
                <td className={ payment.paid ? 'paid-td' : "" }>
                  <Button className={ payment.paid ? 'success' : 'warning' } onClick={ () => onTogglePaid(index) }>
                    { payment.paid ? 'Set as NOT Paid' : 'Set as PAID' }
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AnnualPlanTable;
