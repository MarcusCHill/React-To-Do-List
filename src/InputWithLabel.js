import React from "react";

/*
This react component returns a label and input element and is created to be reusable by accessing props declared at instantization
*/
function InputWithLabel ({ id, type="text", name, value, onChange,  children}) {
  const inputRef = React.useRef();

  React.useEffect(()=>{
    inputRef.current.focus();
  });

  return(
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input id={id} ref={inputRef} type={type} name={name} onChange={onChange} value={value}/>
    </>
  )
};

export default InputWithLabel;
