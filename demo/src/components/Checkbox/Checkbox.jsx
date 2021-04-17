import React, { useCallback } from 'react';
/** Styles */
import './Checkbox.scss';

const Checkbox = ({
  id,
  value,
  defaultChecked = false,
  children,
  onChange,
}) => {
  const handleChange = useCallback(
    ({ target: { checked } }) => {
      onChange(checked);
    },
    [onChange]
  );

  return (
    <div className="checkbox">
      <input
        className="checkbox__check"
        type="checkbox"
        id={id}
        value={value}
        defaultChecked={defaultChecked}
        onChange={handleChange}
      />
      <label className="checkbox__label" htmlFor={id}>
        <span className="checkbox__box"></span>
        <span className="checkbox__text">{children}</span>
      </label>
    </div>
  );
};

export default Checkbox;
