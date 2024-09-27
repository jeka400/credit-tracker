import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { deletePayment } from '../../../../redux/creditSlice';
import AnnualPlanList from '../views/AnnualPlanList';

const AnnualPlanListController: React.FC = () => {
  const payments = useSelector((state: RootState) => state.credit.payments);
  
  const dispatch = useDispatch();

  const handleDeletePayment = (index: number) => {
    dispatch(deletePayment(index));
  };

  return (
    <AnnualPlanList
      payments={ payments } 
      onDelete={ handleDeletePayment } 
    />
  );
};

export default AnnualPlanListController;
