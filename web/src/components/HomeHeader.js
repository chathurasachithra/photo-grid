import React from 'react';
import {
  Nav,
  NavItem,
} from 'reactstrap';
import { Container } from 'reactstrap';
import './HomeHeader.scss';

export const HomeHeader = props => {

  return (
    <React.Fragment>
      <Container>
        <a href="/"><h1>My Photo Grid</h1></a>
        <div className="d-flex ml-2">
          <Nav className="d-none d-none d-lg-block font-weight-bold" navbar>
            <NavItem className="px-3">
              <a href="/create-new-grid" className="nav-link header-title">
                Create a new grid
              </a>
            </NavItem>
          </Nav>
        </div>
      </Container>
    </React.Fragment>
  );
};
