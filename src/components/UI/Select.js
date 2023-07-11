import React from 'react';

const Select = ({defaultValue, onChange, label, options, component}) => {
  const optionsArray = options.map(item =>
    <option key={item} value={item}>
      {item}
    </option>)

  return (
    <div>
      <label htmlFor={label}>
        {label}
      </label>
      <select
        defaultValue={defaultValue} name={label} id={label}
        onChange={onChange}>
        {optionsArray}
      </select>
      {component}
    </div>
  );
};

export default Select;