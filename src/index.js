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
//server.use(registerCertificate())
/*server.use(function(req, res, next) {
  console.log('logger....');
  console.log(req, res)
  return next();
});*/
async function app() {

  const hmkit = new HMKit(
    "dGVzdP910yYW6M2mtioAlDzaYwwsEFiWl2kXxRpjzpgfz1G3Exlroo8ZeBGP2mcIwDx86yWoWiVOU5qy5EN4UQuw/qRLPY3OS+VZO8OwkMLCh9asQd0xPzw/4f/wqKNtIm1CAZJEWzI7FSWW43uL2ovWkMd+cDNYwyMD4crccATXB9A98tTp8bLfsLrarJ6EzNe/sR/CxpXS", 
    "DQJSJHHlphXhCJNcmwKjQ+tyBKEIh24elts0dSr4dGY="
  );

  const accessCertificate = await hmkit.downloadAccessCertificate(
    "t5B5PQ0CyW1qTA30c-hynY8jpOT5-yigm8By0gbLG2q19Fy8kFmIaAIo7Zew8uW2m9985EoiI1CTJr6nU95flpbnrqWmWVJXsyjkvDLDbIKpFgoBatmjotIc6JVtH-04ig"
  );
  
  console.log('Engine starting...')
  const startTheEngine = await hmkit.telematics.sendCommand(
    accessCertificate.getVehicleSerial(),
    //hmkit.commands.EngineCommand.turnOn()
    hmkit.commands.FuelingCommand.openGasFlap()
  );
  console.log(startTheEngine.bytes());
  console.log(startTheEngine.parse());
  console.log('Engine started...')
  return {accessCertificate: accessCertificate, hmkit: hmkit}  ;
}
server.listen(config.port, () => {  
  
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
    
    require('./routes')({ db, server, app});
  });
});
