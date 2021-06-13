const ResponseService = {

  /**
   * Error Response
   * 
   * @param {*} res 
   * @param {*} error 
   */
  error: (res, error) => {

    res.status(400).json({
      statusCode: 400,
      message: 'error',
      data: null,
      error: `${error}`,
      errorMessage: error.message,
    });
  },

  /**
   * Unauthorized Response
   * 
   * @param res
   * @param error
   */
  unauthorized: (res, error) => {

    res.status(401).json({
      statusCode: 401,
      message: 'error',
      data: null,
      error: `${error}`,
      errorMessage: 'Authentication failed! Please sign-in again',
    });
  },

  /**
   * Success Response
   * 
   * @param res
   * @param data
   */
  success: (res, data) => {

    res.status(200).json({
      statusCode: 200, message: 'success', data, error: null, errorMessage: null,
    });
  }
};

module.exports = ResponseService;
