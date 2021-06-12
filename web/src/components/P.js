import React from 'react';
import './P.scss';

export const P = ({ htmlFor, children, size = 'medium', style }) => (
  <p className={`p p-${size}`} style={style} htmlFor={htmlFor}>
    {children}
  </p>
);
