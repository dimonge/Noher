import HMKit from 'hmkit';

/*
 Before using the HMKit, you must initialise the library with a snippet from the Developer Center:
 - go to https://developers.high-mobility.com
 - LOGIN
 - choose DEVELOP (in top-left, the (2nd) button with a spanner)
 - choose APPLICATIONS (in the left), then CLOUD APPS
 - create a new Cloud App, enter the name of your server
 - click on the creaated Cloud App
 - copy the snippet
 - paste it below this comment box
 - you made it!

 Bonus steps after completing the above:
 - relax
 - celebrate
 - explore the APIs


 An example of a snippet copied from the Developer Center might look:

const hmkit = new HMKit(
  "dGVzdHPXjh7VTyjZt8XoNrK/hJDUSSj1i4VzQpIcUds08P9QzqpbWUKl46VVa0LC5AZJTxDr6FSVlOFiD8EKCSQVG1QXJe7umDAnRFzgYnUKHm5jA9LwayteCRB49ZyUPgpAOXJMsSAqXbouX9rDU6dQ+UCjn7oL6+ZDBbDA+X71LFhuR9XNuV8VBiV5T3gID8TFfME67Vp3",
  "uGGjPucN7SnP3BxV3a4VH6q0yy+oLbf3UM5+GtLLSSc="
);

 */

// PASTE CLIENT CERTIFICATE SNIPPET HERE

/*const hmkit = new HMKit(
    "dGVzdP910yYW6M2mtioAlDzaYwwsEFiWl2kXxRpjzpgfz1G3Exlroo8ZeBGP2mcIwDx86yWoWiVOU5qy5EN4UQuw/qRLPY3OS+VZO8OwkMLCh9asQd0xPzw/4f/wqKNtIm1CAZJEWzI7FSWW43uL2ovWkMd+cDNYwyMD4crccATXB9A98tTp8bLfsLrarJ6EzNe/sR/CxpXS", 
    "DQJSJHHlphXhCJNcmwKjQ+tyBKEIh24elts0dSr4dGY="
);
*/
async function app() {
  /*

   Before using Telematics in HMKit, you must get the Access Certificate for the car / emulator:
   - go to https://developers.high-mobility.com
   - LOGIN
   - go to Tutorials ›› SDK ›› Node.js for instructions to connect a service to the car
   - find and do the tutorial for connecting a Service to the car
   - authorise the service
   - take a good look into the mirror, you badass
   - open the SANDBOX car emulator
   - on the left, in the Authorised Services list, choose the Service you used before
   - copy the ACCESS TOKEN
   - paste it below to the appropriately named variable

   Bonus steps again:
   - get a beverage
   - quench your thirst
   - change the world with your mind
   - explore the APIs


   An example of an access token:

   awb4oQwMHxomS926XHyqdx1d9nYLYs94GvlJYQCblbP_wt-aBrpNpmSFf2qvhj18GWXXQ-aAtSaa4rnwBAHs5wpe1aK-3bD4xfQ3qtOS1QNV3a3iJVg03lTdNOLjFxlIOA

   */

  const accessCertificate = await hmkit.downloadAccessCertificate(
    "t5B5PQ0CyW1qTA30c-hynY8jpOT5-yigm8By0gbLG2q19Fy8kFmIaAIo7Zew8uW2m9985EoiI1CTJr6nU95flpbnrqWmWVJXsyjkvDLDbIKpFgoBatmjotIc6JVtH-04ig"
  );

  const startTheEngine = await hmkit.telematics.sendCommand(
    accessCertificate.getVehicleSerial(),
    hmkit.commands.EngineCommand.turnOff()
  );

  console.log(startTheEngine.bytes());
  console.log(startTheEngine.parse());
}

// Run your app

/**
 *  using restify, nodejs and restify to create a api to 
 *    make car changes and collect data from the car.
 */ 
