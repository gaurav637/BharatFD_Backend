const { createLogger, format, transports } = require('winston');
// used logger best practice for debugging and argo CI/CD logs
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new transports.Console(), 
    new transports.File({ filename: 'logs/app.log' }), 
  ],
});

module.exports = logger;
