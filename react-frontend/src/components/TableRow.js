import { useDispatch } from "react-redux";
import axios from "../Config/axios";
import { baseURL } from "../Config/basic";
import { expenseAction } from "../store/expense";

const TableRow = (props) => {
  const dispatch = useDispatch();
  const onDeleteHandler = () => {
    axios
      .delete(`${baseURL}expense/${props._id}`)
      .then((res) => {
        console.log(props.onChange, "-----On Delete------");
        dispatch(expenseAction.delete(props._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onEdit = () => {
    props.onEditById(props._id);
  };
  return (
    <tr>
      <td>{props.amount} </td>
      <td>{props.description}</td>
      <td>{props.category}</td>
      <td>
        <button className="btn btn-dark" onClick={onEdit}>
          Edit
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={onDeleteHandler}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
