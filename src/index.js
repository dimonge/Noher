import 'babel-polyfill';
//import './app';
const HMKit = require('hmkit');

/**
 * Module dependencies
 */
const config = require('./config');
const restify = require('restify');
const mongodb = require('mongodb').MongoClient;
const registerCertificate = require('../middleware/register');

/**
 * Initialize server
 */
const server = restify.createServer({
  name: config.name,
  version: config.version
});

server.use(restify.plugins.bodyParser({mapParams: true}));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({mapParams: true}));
server.use(restify.plugins.fullResponse());

async function app() {

  const hmkit = new HMKit(     
    process.env.CLIENT_CERTIFICATE,
    process.env.CLIENT_PRIVATE_KEY
  );

  const accessCertificate = await hmkit.downloadAccessCertificate(process.env.DOWNLOAD_ACCESS_CERTIFICATE);

  console.log('Engine starting...')
  const startTheEngine = await hmkit.telematics.sendCommand(
    accessCertificate.getVehicleSerial(),
    hmkit.commands.EngineCommand.turnOn()
    //hmkit.commands.FuelingCommand.openGasFlap()
  );
  console.log(startTheEngine.bytes());
  console.log(startTheEngine.parse());
  console.log('Engine started...')
  return accessCertificate.getVehicleSerial();
}
server.listen(config.port, () => {  
  /*
  mongodb.connect(config.db.uri, (err, db) => {
    if (err) {
      console.log('An error occurred while attempting to connect to MongoDB', err);
      process.exit(1);
    }
    console.log(
      '%s %v ready to accept connections on port %s in %s environment.',
      server.name,
      config.version,
      config.port,
      config.env
    )

    let getVehicleSerial = '';
    app().then(key => {
      getVehicleSerial = key;
      //db.createCollection("serial");
      
      db.getCollection('serial').insertOne({key});
    })
    console.log(db)
*/
    
    
    
    
  //});
  console.log('listening to port', config.port);
  require('./routes')({ server });
});
