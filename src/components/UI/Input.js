import React from 'react';

const Input = (props) => {
  return (
    <input
      onChange={e => props.setValue(e.target.value)}
      value={props.value}
      type={props.type}
      className={props.styles}
      id={props.id}
      name={props.name}
      minLength={props.minLength}
      maxLength={props.maxLength}
      checked={props.checked}
      placeholder={props.placeholder}/>
  );
};

export default Input;