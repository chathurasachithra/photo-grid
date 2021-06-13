import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { Button } from 'semantic-ui-react';

class Page404 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">Oops! You're lost.</h4>
              <p className="text-muted float-left">
                The page you are looking for was not found.
              </p>
            </div>
          </Row>
          <Row className="justify-content-center mt-3">
            <a href="/">
              <Button basic color="red">
                Home
              </Button>
            </a>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page404;
