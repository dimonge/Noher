'use strict';

module.exports = {
  name: 'Noher',
  version: '0.0.1',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db: {
    uri: 'mongodb://peter:peter@ds149954.mlab.com:49954/noher'
  }
}