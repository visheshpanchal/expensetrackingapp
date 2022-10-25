import React from "react";

const FormField = React.forwardRef((props, ref) => {
  const required = props.required ? true : false;

  return (
    <React.Fragment>
      <label className="d-inline form-label pe-1">{props.label}</label>
      <input type={props.typeName} className="d-inline form-control w-50" ref={ref} required={required} />
    </React.Fragment>
  );
});

export default FormField;
