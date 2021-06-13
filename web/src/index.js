import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { unregister, register } from './serviceWorker';

import { bindActionCreators } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

// styles
import './theme/index.scss';
import './index.scss';

// bootstrap styles
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// react-notifications styles
import 'react-notifications/lib/notifications.css';

// semantic-ui-css styles
import 'semantic-ui-css/semantic.min.css';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import 'react-dropzone-uploader/dist/styles.css';

import { BASE_URL, AUTH_URL } from './constant';
import AppRoutes from './routes';
import configureStore from './store';

// create our store
const { store, persistor } = configureStore();

axios.defaults.baseURL = BASE_URL;
export const AuthAxios = axios.create({
  baseURL: `${AUTH_URL}`,
});

const setHeaders = async () => {
  const authToken = await localStorage.getItem('auth-token');
  if (authToken) {
    AuthAxios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  }
};
setHeaders();

axios.defaults.timeout = 30000;
axios.interceptors.request.use(request => {
  request.ts = performance.now(); // to find the performance
  if (
    request.data &&
    request.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    request.data = qs.stringify(request.data);
  }
  return request;
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const { response } = error;

    return Promise.reject(response);
  }
);

AuthAxios.interceptors.request.use(
  async config => {
    // Do something with request data
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

AuthAxios.interceptors.response.use(
  async response => {
    // Do something with response data
    return response;
  },
  error => {
    const {
      response: { status },
    } = error;

    if (status === 401) {
      persistor.purge();
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

class IndexApp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      view: false,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    unregister();
  }

  async componentDidMount() {
    try {
      unregister();
      this.setState({ view: true });
    } catch (error) {
      this.setState({ view: true });
    }
  }

  render() {
    const { view } = this.state;

    if (view) {
      return <div>{this.props.children}</div>;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const mapStateToProps = state => {
  return state;
};

let AppWrapper = connect(mapStateToProps, mapDispatchToProps)(IndexApp);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppWrapper>
        <AppRoutes />
      </AppWrapper>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

register();
