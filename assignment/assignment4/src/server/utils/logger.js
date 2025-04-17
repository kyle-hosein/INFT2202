const winston = require('winston');
//https://www.npmjs.com/package/winston

const logger = winston.createLogger({
  level: 'info', // Only messages with a severity level of 'info' and higher (e.g., 'warn' and 'error') will be logged.
  format: winston.format.json(),
  defaultMeta: { service: 'animal-service' },
  transports: [
    // Write error logs to `logs/error.log`
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Write all logs to `logs/combined.log`
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// If not in production, log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.printf(log => log.message),
  }));
}

// ✅ Use CommonJS export
module.exports = { logger };
