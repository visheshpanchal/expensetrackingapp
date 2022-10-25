import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import expenseReducer from "./expense";

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer },
  w: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
});

export default store;
