import React, { useContext } from 'react';
/** Context */
import { RadioGroupContext } from 'context';
/** Styles */
import './RadioButton.scss';

const RadioButton = ({ children, id, ...props }) => {
  const context = useContext(RadioGroupContext);

  return (
    <label className="radio__label" htmlFor={id}>
      <input className="radio__input" id={id} {...props} {...context} />
      <span className="radio__fake-input"></span>
      <span className="radio__text">{children}</span>
    </label>
  );
};

export default RadioButton;
