import React from "react";
import PropTypes from 'prop-types';
import style from "./InputWithLabel.module.css"

InputWithLabel.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.string,
}


/*
This react component returns a label and input element and is created to be reusable by accessing props declared at instantization
*/
function InputWithLabel ({ id, type="text", name, value, onChange,  children}) {

  /*
  input element is focused on initial render
  */
  const inputRef = React.useRef();

  React.useEffect(()=>{
    inputRef.current.focus();
  }, []);

  return(
    <>
      <label htmlFor={id} className={style.label}>{children}</label>
      &nbsp;
      <input id={id} ref={inputRef} type={type} name={name} onChange={onChange} value={value} className={style.input} required/>
    </>
  )
};

export default InputWithLabel;
