class NotFound extends Error {
    constructor(message = 'Not Found') {
      super(message);
      this.status = 404;
    }
  }
  
  class BadRequest extends Error {
    constructor(message = 'Bad Request', errors = []) {
      super(message);
      this.status = 400;
      this.errors = errors;
    }
  }
  
  const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(status).json({
      error: {
        message,
        ...(err.errors ? { details: err.errors } : {})
      }
    });
  };
  
  module.exports = {
    errorHandler,
    NotFound,
    BadRequest
  };
  