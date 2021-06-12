import React, { useEffect, useState } from 'react';
import GridSelector from './GridSelector';
import { Grid, Header } from 'semantic-ui-react';
import BeatLoader from 'react-spinners/BeatLoader';

const Images = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const req = {};
    const fetchData = async () => {
      const resData = await props.getImages(req);
      const images = resData || [];
      setData([...data, ...images]);
    };
    fetchData();
  }, []);
  return (
    <div className="card-container">
      {props.header ? <Header as="h2" className="content-header">{props.header}</Header> : null}
      <p>Please select nine images to generate a photo grid (Drag and drop the images into right side bucket) </p>
      <GridSelector {...props} rows={data || []} />
      {!data.length && !props.loading ? (
        <Grid className="no-data my-3" centered>
          No Images Found
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
