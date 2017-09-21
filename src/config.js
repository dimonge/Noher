'use strict';

module.exports = {
  name: 'Noher',
  version: '0.0.1',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db: {
    uri: 'mongodb://peter:peter@nohercluster-shard-00-00-mscw5.mongodb.net:27017,nohercluster-shard-00-01-mscw5.mongodb.net:27017,nohercluster-shard-00-02-mscw5.mongodb.net:27017/test?ssl=true&replicaSet=NoherCluster-shard-0&authSource=admin'
  }
}