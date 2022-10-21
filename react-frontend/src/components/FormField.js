import React from "react";

const FormField = (props) => {
  const required = props.required ? true : false;

  return (
    <React.Fragment>
      <label className="d-inline form-label pe-1">{props.label}</label>
      <input type={props.typeName} className="d-inline form-control w-50" ref={props.ref} required={required} />
    </React.Fragment>
  );
};

export default FormField;
