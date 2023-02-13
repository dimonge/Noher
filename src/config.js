'use strict';

module.exports = {
  name: 'Noher',
  version: '0.0.1',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_ENVIRONMENT || 'mongodb://localhost:27017/noher',
  }
}