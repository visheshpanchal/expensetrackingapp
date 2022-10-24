import FormField from "./FormField";
import axios from "../Config/axios";
import { baseURL } from "../Config/basic";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { expenseAction } from "../store/expense";
const ExpenseForm = (props) => {
  // Ref Hook
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  // State
  let [category, setCategory] = useState("");
  const { isEdit, onEdit } = props;
  useEffect(() => {
    axios.get(`${baseURL}category`).then((res) => {
      const categoryList = res.data;

      const data = categoryList.data;
      setCategory((prevState) => {
        return data.map((d) => {
          return (
            <option value={d.id} key={d.id}>
              {d.category.toUpperCase()}
            </option>
          );
        });
      });
    });
  }, []);

  const expenseHandler = async (e) => {
    e.preventDefault();
    if (isEdit === "") {
      try {
        let option = categoryRef.current.selectedOptions[0].value;
        let res = await axios.post(`${baseURL}expense`, { amount: amountRef.current.value, description: descriptionRef.current.value, category: option });

        if (res.status === 201) {
          alert("Response added");

          props.onChange((prevState) => {
            return [res.data._id];
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let option = categoryRef.current.selectedOptions[0].value;
        let res = await axios.put(`${baseURL}expense/${isEdit}`, { amount: amountRef.current.value, description: descriptionRef.current.value, category: option });

        if (res.status === 201) {
          alert("Response Updated");
          props.onEdit("");
          props.onChange((prevState) => {
            return [isEdit];
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = 0;
  };
  const items = useSelector((state) => state.expense.items);
  if (isEdit !== "") {
    const index = items.findIndex((item) => {
      console.log(item, "---- In Update Check Function ---");
      return item.e._id === isEdit;
    });
    console.log(isEdit, index);
    const item = items[index];
    amountRef.current.value = item.e.amount;
    descriptionRef.current.value = item.e.description;
    categoryRef.current.value = item.e.categoryId;
  }

  return (
    <div className="container-fluid d-flex justify-content-center mt-5">
      <form onSubmit={expenseHandler}>
        <div className="d-flex">
          <div className="p-2">
            <FormField label={"Amount"} typeName={"Number"} ref={amountRef} />
          </div>
          <div className="p-2">
            <FormField label={"Description"} typeName={"text"} ref={descriptionRef} />
          </div>
          <div className="p-2">
            <select placeholder="Choose" className="d-inline form-select" ref={categoryRef} required>
              {category}
            </select>
          </div>

          <div className="p-2">
            <button className="btn btn-dark" type="submit">
              {isEdit === "" ? "Add" : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
