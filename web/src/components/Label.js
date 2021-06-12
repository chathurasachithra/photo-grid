import React from 'react';
import './Label.scss';

export const Label = ({ htmlFor, children, size = 'medium', style }) => (
  <label className={`label label-${size}`} style={style} htmlFor={htmlFor}>
    {children}
  </label>
);
