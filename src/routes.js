'use strict';
const HMKit = require('hmkit');
const hmkit = new HMKit(
  process.env.CLIENT_CERTIFICATE,
  process.env.CLIENT_PRIVATE_KEY
);
const accessCertificate = await hmkit.downloadAccessCertificate(
  process.env.DOWNLOAD_ACCESS_CERTIFICATE
);

module.exports = (ctx) => {
  const server = ctx.server;

  server.get('/startEngine', (req, res, next) => {
    async function app() {      
      
        console.log('Engine starting...')
        const turnOn = hmkit.commands.EngineCommand.turnOn();
        const turnOff = hmkit.commands.EngineCommand.turnOff();
        let engineState;
        if (req.params.state === 'true') {
          engineState = await hmkit.telematics.sendCommand(
            accessCertificate.getVehicleSerial(),
            turnOn
            //hmkit.commands.FuelingCommand.openGasFlap()
          );
        } else {
          engineState = await hmkit.telematics.sendCommand(
            accessCertificate.getVehicleSerial(),
            turnOff            
          );
        }
        
        res.send(engineState.parse());
      }
      app();
      next();
  });

  server.get('/diagnostics', (req, res, next) => {
    async function app() {      
        console.log('Engine starting...')
        const maintenance = hmkit.commands.MaintenanceCommand.getState();
        const charging = hmkit.commands.ChargingCommand.getChargeState();
        const doorLock = hmkit.commands.DoorLocksCommand.getState();
        const vehicleStatus = hmkit.commands.VehicleLocationCommand.get();
        
        const startTheEngine = await hmkit.telematics.sendCommand(
          accessCertificate.getVehicleSerial(),
          //hmkit.commands.DiagnosticsCommand.getState()
          //hmkit.commands.DoorLocksCommand.unlock()
          vehicleStatus
        );
        res.send(startTheEngine.parse());
      }
      app();
      next();
  });
}
/*
module.exports = (ctx) => {
  const db = ctx.db;
  const server = ctx.server;
  const commandAccessCertificate = ctx.getVehicleSerial; // return an promise
  console.log('commandAccessCertificate', commandAccessCertificate)
  // list of commands executed and the response for the car
  const collection = db.collection('command');
  /**
   * Send commands
   *
  server.post('/command', (req, res, next)  => {
    const data = Object.assign({}, req.body, {
      created: new Date(),
      updated: new Date()
    });

    collection.insertOne(data)
      .then(command => res.send(200, command.ops[0]))
      .catch(err => res.send(500, err))
    
    next();
  })

  server.put('/command/:type', (req, res, next) => {
    const data = Object.assign({}, req.body, {
      updated: new Date()
    });
    next();
  })

}*/