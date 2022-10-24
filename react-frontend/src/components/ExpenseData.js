import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../Config/axios";
import { baseURL } from "../Config/basic";
import TableRow from "./TableRow";
import { expenseAction } from "../store/expense";

const ExpenseData = (props) => {
  const [tableItem, setTableItem] = useState("");
  // this is fetching data from index
  const [fromIndex, setFromIndex] = useState(0);
  const dispatch = useDispatch();
  const { onChange } = props;
  const onEdit = (id) => {
    props.onEdit(id);
  };

  useEffect(() => {
    let onChange = () => props.setOnChange((prevState) => [props.id]);
    axios
      .get(`${baseURL}expense?limit=20`)
      .then((res) => {
        console.log(res.data);
        setTableItem((prevState) => {
          return res.data.data.map((e) => {
            dispatch(expenseAction.add({ e }));
            return <TableRow onChange={onChange} key={e._id} _id={e._id} amount={e.amount} description={e.description} category={e.category.category} onEditById={onEdit} />;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Work ----- ", props.onChange);
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
        <tbody>{tableItem}</tbody>
      </table>
    </div>
  );
};

export default ExpenseData;
