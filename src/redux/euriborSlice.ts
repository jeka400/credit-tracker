import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IEuribor {
    threeM: number;
    sixM: number;
    twelveM: number;
}

interface IEuriborState {
    threeM: number;
    sixM: number;
    twelveM: number;
}

const savedEuribor = localStorage.getItem('euribor');

const initialState: IEuriborState = savedEuribor
    ? JSON.parse(savedEuribor)
    : { threeM: 0, sixM: 0, twelveM: 0 };

const euriborSlice = createSlice({
    name: 'euribor',
    initialState,
    reducers: {
        setEuribor(state, action: PayloadAction<IEuribor>) {        
            state.threeM = action.payload.threeM;
            state.sixM = action.payload.sixM;
            state.twelveM = action.payload.twelveM;

            localStorage.setItem('euribor', JSON.stringify(state));
        }
    }
});

export const { setEuribor } = euriborSlice.actions;

export default euriborSlice.reducer;
