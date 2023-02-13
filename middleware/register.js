const HMKit = require('hmkit');

const hmkit = new HMKit(
  process.env.CLIENT_CERTIFICATE,
  process.env.CLIENT_PRIVATE_KEY
);
const accessCertificate = await hmkit.downloadAccessCertificate(
  process.env.DOWNLOAD_ACCESS_CERTIFICATE
);
module.exports = function() {
  console.log('elo')
  return (req, res, next) => {
    async function app() {  
      console.warn('Granted access to the certificate', accessCertificate);

      console.log('Engine starting...')
      const startTheEngine = await hmkit.telematics.sendCommand(
        accessCertificate.getVehicleSerial(),
        hmkit.commands.EngineCommand.turnOff()
      );
      
      console.log(startTheEngine.bytes());
      console.log(startTheEngine.parse());
      console.log('Engine started...')
      return accessCertificate;
    }
    app()
    return next(app());
  };
}