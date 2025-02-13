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
      />
    </div>
  );
});

export default Input;