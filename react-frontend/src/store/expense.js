import { createSlice } from "@reduxjs/toolkit";

const initExpense = {
  items: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initExpense,
  reducers: {
    add(state, action) {
      state.items.push(action.payload);
    },

    delete(state, action) {
      let index = state.items.findIndex((item) => item._id === action.id);

      state.items[index].splice(index, 1);
    },
  },
});

export const expenseAction = expenseSlice.actions;

export default expenseSlice.reducer;
