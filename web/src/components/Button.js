import React from 'react';
import './Button.scss';

export const Button = props => {
  let {
    children,
    className = '',
    color = 'blue',
    type = 'square',
    size,
    outline = '',
    onlyOutline,
    onSubmit,
    onClick,
    full,
    fontColor,
    bold,
  } = props;
  let newClasses = '';

  if (size) {
    newClasses = `${newClasses} button-${size} `;
  }
  if (outline) {
    newClasses = `${newClasses} button-outline `;
  }
  if (onlyOutline) {
    newClasses = `${newClasses} button-only-outline-${onlyOutline} `;
  }
  if (full) {
    newClasses = `${newClasses} button-full `;
  }
  if (fontColor) {
    newClasses = `${newClasses} button-font-${fontColor} `;
  }
  if (bold) {
    newClasses = `${newClasses} button-bold `;
  }

  return (
    <button
      className={`
                common-button
                button-${color}
                button-${type}
                ${newClasses}
                ${className}
                `}
      onSubmit={e => {
        return onSubmit(e);
      }}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;
