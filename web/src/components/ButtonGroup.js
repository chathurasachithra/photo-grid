import React, { useState } from 'react';
import './ButtonGroup.scss';

export const ButtonGroup = ({ options, selected, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(selected);
  return (
    <div className="d-flex">
      {options.map((option, i) => {
        return (
          <div key={i}>
            <input
              className="checkbox-tools"
              type="checkbox"
              name="tools"
              id={option.id || option.label}
              checked={selectedOption === option.value ? true : false}
              onChange={() => {
                setSelectedOption(option.value);
                onChange(option.value);
              }}
            />
            <label
              className="for-checkbox-tools"
              htmlFor={option.id || option.label}
            >
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};
