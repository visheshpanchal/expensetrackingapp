import { createSlice } from "@reduxjs/toolkit";

const initExpense = {
  items: [],
  lastIndex: 0,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initExpense,
  reducers: {
    add(state, action) {
      const items = action.payload;

      state.items = state.items.concat(items.data);
      console.log(items.data.at(-1)._id, "last Index");
      state.lastIndex = items.data.at(-1)._id;
    },

    delete(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item._id !== id);
    },

    update(state, action) {
      const item = action.payload;

      state.items = state.items.map((old) => {
        if (old._id === item._id) {
          return item;
        }

        return old;
      });
    },

    // update(state, action) {
    //   let index = state.items.findIndex((item) => item._id === action.id);
    // }
  },
});

export const expenseAction = expenseSlice.actions;

export default expenseSlice.reducer;
