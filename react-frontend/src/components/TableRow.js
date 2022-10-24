import axios from "../Config/axios";
import { baseURL } from "../Config/basic";

const TableRow = (props) => {
  const onDeleteHandler = () => {
    axios.delete(`${baseURL}expense/${props._id}`).then((res) => {
      console.log(props.onChange, "-----------");
      props.onChange((prevState) => {
        return [res.data.status];
      });
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
