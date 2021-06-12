import { setCachedToken, getCachedToken } from './cacheStore';

export const userAuth = {
  isAuthenticated: Boolean(getCachedToken) || false,
  async authenticate(cb) {
    try {
      this.isAuthenticated = true;
    } catch (error) {
      console.log('TCL: authenticate -> error', error);
    }
    cb();
  },
  async signout() {
    try {
      this.isAuthenticated = false;
      await setCachedToken(null);
    } catch (error) {
      console.log('TCL: signout -> error', error);
    }
  },
};

export const resolveResponse = res => {
  try {
    const result = {
      data: null,
      error: null,
    };

    if (!res.hasOwnProperty('data') || typeof res.data === 'string') {
      result.error = { message: 'Oops, Something went wrong!' };
      return result;
    }

    if (res.data.hasOwnProperty('error')) {
      result.error = res.data.error;
      return result;
    }

    // if not errors then return response data
    result.data = res.data;
    return result;
  } catch (error) {
    console.log('TCL: resolveResponse -> error', error);
  }
};

export const getCommonError = errorResponse => {
  try {
    const errorData = errorResponse.response;

    if (!errorData) {
      return 'Oops, Something went wrong!';
    }

    if (errorData.status) {
      if (errorData.status === 400) {
        return (
          errorData?.data?.message ||
          'Inputs may not valid, Please check again!'
        );
      } else if (errorData.status === 401) {
        return [
          "You were idle too long. You'll need to login again.",
          "You've Timed Out!",
        ];
      } else if (errorData.status === 403) {
        return "You don't have permission to make this call";
      } else if (errorData.status === 404) {
        return 'Sorry, Record not found';
      } else if (errorData.status === 405) {
        return 'Request is not allowed';
      } else if (errorData.status === 500) {
        return 'Oops, Something went wrong!';
      } else {
        return 'Oops, Something went wrong!';
      }
    }

    return 'Oops, Something went wrong!';
  } catch (error) {
    console.log('TCL: getCommonError -> error', error);
  }
};

export const getRandomData = (arrayLength, max) => {
  const dataSet = [];
  for (let index = 0; index < arrayLength; index++) {
    dataSet.push(Math.floor(Math.random() * Math.floor(max)));
  }
  return dataSet;
};

export const makeid = length => {
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
