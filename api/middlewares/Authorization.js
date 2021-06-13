const ResponseService = require('../services/ResponseService');

module.exports = async (req, res, next) => {
  try {
    // TODO Implement authentication here
    req.user = {
      id: '5ffec928e083f6d8a52ad107',
      user_name: 'Chathura Fernando',
      email: 'chathurasachithra@gmail.com'
    };
    next();
  } catch (error) {
    ResponseService.unauthorized(res, error);
  }
};
