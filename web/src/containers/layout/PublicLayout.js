import React, { Suspense, useState } from 'react';
import { AppHeader, AppFooter } from '@coreui/react';
import { HomeHeader, DefaultFooter } from '../../components';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BeatLoader from 'react-spinners/BeatLoader';
import './layout.scss';

const loading = () => (
  <div className="animated fadeIn pt-1 text-center justify-content-center">
    <BeatLoader size={6} loading color="#db2828" />
  </div>
);

const PublicLayout = props => {
  const [isOpenAside, onAsideClick] = useState(false);
  return (
    <div className="app">
      <AppHeader className="home-header px-0">
        <Suspense fallback={loading()}>
          <HomeHeader
            {...props}
            onAsideClick={() => {
              onAsideClick(!isOpenAside);
            }}
          />
        </Suspense>
      </AppHeader>
      <div className="app-body home-header-body">
        <main className="main">
          <Container>
            <Suspense fallback={loading()}>{props.children}</Suspense>
          </Container>
        </main>
      </div>
      <AppFooter className="footer footer-container p-0 mt-4">
        <Suspense fallback={loading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {},
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicLayout);
