import React, { useState } from 'react';
import {
  Card,
  Image,
  Dimmer,
  Segment,
} from 'semantic-ui-react';
import { Row, Col } from 'reactstrap';
import BeatLoader from 'react-spinners/BeatLoader';
import LazyLoad from 'react-lazyload';
import './CardGroup.scss';

export const CardGroup = ({
  rows = [],
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Row>
      {rows.map((row, i) => {
        return (
          <Col className="card-content" key={i} md="4" sm="4" xs="4">
            <LazyLoad throttle={200} height={300}>
              <Card color="red" raised>
                <Dimmer.Dimmable
                  className='card-content-image p-0 m-0'
                  as={Segment}
                  dimmed={isLoading}
                >
                  <Dimmer active={isLoading}>
                    <BeatLoader size={6} loading color="#db2828" />
                  </Dimmer>
                  <Image
                    src={`${row.url}`}
                    wrapped
                    ui={false}
                    onLoad={() => {
                      setLoading(false);
                    }}
                  />
                </Dimmer.Dimmable>
              </Card>
            </LazyLoad>
          </Col>
        );
      })}
    </Row>
  );
};
