import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    expensearr : [],
    desc : '',
    category: '',
    date : '',
    money: '',
}

const Expenseslice = createSlice({
    name : 'Expense',
    initialState : initialState,
    reducers : {
        addExpense : (state, {payload})=>{
           state.expensearr = [...state.expensearr,payload];
        },

        getExpense : (state,action) =>{
            state.expensearr = action.payload;
        },

        deleteExpense(state, action) {
            const delId = action.payload;
            const filteredExpenses = state.expensearr.filter(
              (expensearr) => expensearr.id !== delId
            );
            state.expensearr = filteredExpenses;
            state.changed = true;
          },

        setExpenseEditID: (state, action) => {
            state.expenseEditID = action.payload;
          }
    }
})

export const ExpensesliceAction = Expenseslice.actions;

export default Expenseslice.reducer;