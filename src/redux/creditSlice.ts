import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/store'; 


interface IPayments {
  date: string;
  amount: number;
  paid: boolean;
}

interface ICreditState {
  payments: IPayments[];
}

const savedPayments = localStorage.getItem('payments');

const initialState: ICreditState = {
  payments: savedPayments ? JSON.parse(savedPayments) : [],
};

const creditSlice = createSlice({
  name: 'credit',
  initialState,
  reducers: {
    addPayment(state, action: PayloadAction<IPayments>) {
      state.payments.push(action.payload);
      state.payments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      localStorage.setItem('payments', JSON.stringify(state.payments));
    },

    editPayment(state, action: PayloadAction<{ index: number; amount: number }>) {
      const { index, amount } = action.payload;
      state.payments[index].amount = amount;

      localStorage.setItem('payments', JSON.stringify(state.payments));
    },

    togglePaid(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.payments[index].paid = !state.payments[index].paid;

      localStorage.setItem('payments', JSON.stringify(state.payments));
    },

    setPayments(state, action: PayloadAction<IPayments[]>) {
      state.payments = action.payload;

      localStorage.setItem('payments', JSON.stringify(state.payments));
    },

    deletePayment(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.payments.splice(index, 1);

      localStorage.setItem('payments', JSON.stringify(state.payments));
    },
  },
});

export const selectPayments = (state: RootState) => state.credit.payments;

export const { addPayment, editPayment, togglePaid, setPayments, deletePayment } = creditSlice.actions;

export default creditSlice.reducer;
