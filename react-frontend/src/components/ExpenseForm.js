import FormField from "./FormField";

const ExpenseForm = () => {
  return (
    <div className="container-fluid d-flex justify-content-center mt-5">
      <form>
        <div className="d-flex">
          <div className="p-2">
            <FormField label={"Amount"} typeName={"Number"} />
          </div>
          <div className="p-2">
            <FormField label={"Description"} typeName={"text"} />
          </div>
          <div className="p-2">
            <select placeholder="Choose" className="d-inline form-select">
              <option value="">Choose</option>
            </select>
          </div>

          <div className="p-2">
            <button className="btn btn-dark" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
