'use strict';

module.exports = (ctx) => {
  const db = ctx.db;
  const server = ctx.server;
  const commandAccessCertificate = ctx.getVehicleSerial; // return an promise
  console.log('commandAccessCertificate', commandAccessCertificate)
  // list of commands executed and the response for the car
  const collection = db.collection('command');
  /**
   * Send commands
   */
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

}