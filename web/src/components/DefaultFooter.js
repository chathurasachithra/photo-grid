import React from 'react';
import './DefaultFooter.scss';
export const DefaultFooter = props => {
  return (
    <React.Fragment>
      <footer id="footer" className="footer-1 w-100 p-0">
        <div className="main-footer widgets-dark typo-light">
          <div className="container">
            <div className="row">
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <p>Copyright photogrid © 2021. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
        </footer>
    </React.Fragment>
  );
};
