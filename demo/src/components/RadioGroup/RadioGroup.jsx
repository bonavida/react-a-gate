import React from 'react';
/** Context */
import { RadioGroupContext } from 'context';
/** Components */
import RadioButton from './RadioButton';
/** Styles */
import './RadioGroup.scss';

const useRadioGroup = (name, onChange) => {
  const handleChange = ({ target: { value } }) => {
    onChange && onChange(value);
  };

  return {
    type: 'radio',
    name,
    onChange: handleChange,
  };
};

const RadioGroup = ({
  name,
  options = [],
  valueProperty = 'value',
  labelProperty = 'label',
  initialValue,
  onChange,
}) => {
  const inputProps = useRadioGroup(name, onChange);

  return (
    <div className="radio__group">
      <RadioGroupContext.Provider value={inputProps}>
        {options.map((option) => {
          const value = option[valueProperty];
          const label = option[labelProperty];
          return (
            <RadioButton
              id={`${name}_${value}`}
              value={value}
              defaultChecked={initialValue === value}
              key={value}
            >
              {label}
            </RadioButton>
          );
        })}
      </RadioGroupContext.Provider>
    </div>
  );
};

export default RadioGroup;
