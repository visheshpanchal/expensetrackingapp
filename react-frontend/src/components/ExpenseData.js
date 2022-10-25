import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../Config/axios";
import { baseURL } from "../Config/basic";
import TableRow from "./TableRow";
import { expenseAction } from "../store/expense";

const ExpenseData = (props) => {
  const tableItem = useSelector((state) => state.expense.items);
  const lastIndex = useSelector((state) => state.expense.lastIndex);
  console.log("Work");
  const dispatch = useDispatch();
  const { onChange } = props;
  const getExpenses = async () => {
    try {
      console.log("lastIndex", lastIndex);
      let res = await axios.get(`${baseURL}expense?lastIndex=${lastIndex}`);
      console.log("Data ", res.data.data);
      if (res.data) {
        let data = res.data.data;
        dispatch(expenseAction.add({ data }));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getExpenses();
  }, [onChange]);

  return (
    <div className="container mt-5">
      <table className="table">
        <thead>
          <tr>
            <td>Amount</td>
            <td>Description</td>
            <td>Category</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {tableItem.map((e) => {
            return (
              <TableRow
                key={e._id}
                _id={e._id}
                amount={e.amount}
                description={e.description}
                category={e.category.category}
                onEditById={props.onEdit}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseData;
