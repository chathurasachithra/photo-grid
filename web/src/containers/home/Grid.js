import React, { useEffect, useState } from 'react';
import { CardGroup } from '../../components';
import { Grid, Header } from 'semantic-ui-react';
import BeatLoader from 'react-spinners/BeatLoader';

const Images = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const req = {};
    const feachData = async () => {
      const resData = await props.getGridImages(req);
      const gridImages = resData || [];
      setData([...data, ...gridImages]);
    };
    feachData();
  }, []);
  return (
    <div className="card-container">
      {props.header ? <Header as="h2" className="content-header">{props.header}</Header> : null}
      <CardGroup {...props} rows={data || []} />
      {!data.length && !props.loading ? (
        <Grid className="no-data my-3" centered>
          Not images found for your grid. Please create a new grid first
        </Grid>
      ) : null}
      {props.loading ? (
        <Grid className="my-3" centered>
          <BeatLoader size={10} loading color="#db2828" />
        </Grid>
      ) : null}
    </div>
  );
};

export default Images;
