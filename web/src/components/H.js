import React from 'react';
import './H.scss';

export const H1 = ({ style, children, color = 'black' }) => (
  <h1 className={`h1 color-${color}`} style={style}>
    {children}
  </h1>
);
export const H2 = ({ style, children, color = 'black' }) => (
  <h2 className={`h2 color-${color}`} style={style}>
    {children}
  </h2>
);
export const H3 = ({ style, children, color = 'black' }) => (
  <h3 className={`h3 color-${color}`} style={style}>
    {children}
  </h3>
);
export const H4 = ({ style, children, color = 'black' }) => (
  <h4 className={`h4 color-${color}`} style={style}>
    {children}
  </h4>
);
export const H5 = ({ style, children, color = 'black' }) => (
  <h5 className={`h5 color-${color}`} style={style}>
    {children}
  </h5>
);
export const H6 = ({ style, children, color = 'black' }) => (
  <h6 className={`h6 color-${color}`} style={style}>
    {children}
  </h6>
);
