import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { togglePaid, editPayment } from '../../../redux/creditSlice';
import AnnualPlanTable from '../views/AnnualPlanTable';
import AnnualPlanProgressBar from '../views/AnnualPlanProgressBar';
import { Payment } from '../models/annualPlanModel';
import "../../../styles/AnnualPlanList.css";


const AnnualPlanController: React.FC = () => {
  const payments = useSelector((state: RootState) => state.credit.payments);
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

  return (
    <>
      <AnnualPlanTable 
        payments={ payments } 
        onTogglePaid={ handleTogglePaid } 
        onEditPayment={ handleEditPayment } 
      />
      <AnnualPlanProgressBar payments={ payments } />
    </>
  );
};

export default AnnualPlanController;
