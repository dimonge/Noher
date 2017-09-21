const HMKit = require('hmkit');

module.exports = function() {
  console.log('elo')
  return (req, res, next) => {
    async function app() {
      const hmkit = new HMKit(
        "dGVzdP910yYW6M2mtioAlDzaYwwsEFiWl2kXxRpjzpgfz1G3Exlroo8ZeBGP2mcIwDx86yWoWiVOU5qy5EN4UQuw/qRLPY3OS+VZO8OwkMLCh9asQd0xPzw/4f/wqKNtIm1CAZJEWzI7FSWW43uL2ovWkMd+cDNYwyMD4crccATXB9A98tTp8bLfsLrarJ6EzNe/sR/CxpXS", 
        "DQJSJHHlphXhCJNcmwKjQ+tyBKEIh24elts0dSr4dGY="
      );
      const accessCertificate = await hmkit.downloadAccessCertificate(
        "t5B5PQ0CyW1qTA30c-hynY8jpOT5-yigm8By0gbLG2q19Fy8kFmIaAIo7Zew8uW2m9985EoiI1CTJr6nU95flpbnrqWmWVJXsyjkvDLDbIKpFgoBatmjotIc6JVtH-04ig"
      );    
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