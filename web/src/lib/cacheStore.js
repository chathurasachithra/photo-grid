const USER_TOKEN = 'USER_TOKEN';

export const getCachedToken = async () => {
  return await localStorage.getItem(USER_TOKEN);
};

export const setCachedToken = async token => {
  return await localStorage.getItem(USER_TOKEN, token);
};
