import React, { useRef, useImperativeHandle } from "react";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    isValid: inputRef.current?.validity.valid || false
  }));

  return (
    <div className={props.divClass}>
      <label className={props.labelClass}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        value={props.value}
        className="form-control"
        onChange={props.onChangeHandler}
        onInput={props.onInputHandler}
        id={props.id}
        aria-describedby="emailHelp"
        placeholder={props.placeholder}
        required={props.required}
        onBlur={() => props.handleBlurEvent("fullName", props.value)}
      />
      {props.error && <div style={{width: "100%", marginTop: "0.25rem", fontSize: "0.875em", color: "#dc3545"}}>{props.error}</div>}
      </div>
  );
});

export default Input;