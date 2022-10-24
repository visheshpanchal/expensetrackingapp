import React, { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseData from "../components/ExpenseData";

const ExpensePage = () => {
  const [onChange, setOnChange] = useState("");
  const [onEdit, setOnEdit] = useState("");

  return (
    <React.Fragment>
      <ExpenseForm onChange={setOnChange} isEdit={onEdit} onEdit={setOnEdit} />
      <ExpenseData onChange={onChange} setOnChange={setOnChange} onEdit={setOnEdit} />
    </React.Fragment>
  );
};

export default ExpensePage;
