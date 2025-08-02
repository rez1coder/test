// Initialize Rive animation
const riveInstance = new rive.Rive({
  src: "flag.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  artboard: "Artboard",
  stateMachines: "State Machine 1",
  
  onLoad: () => {
    console.log("Rive animation loaded!");
    riveInstance.resizeDrawingSurfaceToCanvas();

    const inputs = riveInstance.stateMachineInputs("State Machine 1");
    const winSide = inputs.find(i => i.name === "Win Side");
    const winFront = inputs.find(i => i.name === "Win front");
    
    winSide.value = 20;
    winFront.value = 20;
  },
});

// Streamer.bot client connection
const client = new StreamerbotClient();

// Listen for custom events from Streamer.bot
client.on('General.Custom', (payload) => {
  console.log("Received Streamer.bot event:", payload);
  
  if (payload.event === 'changeFlag') {
    handleFlagChange(payload.flag);
  }
});

// Handle flag changes
function handleFlagChange(flagName) {
  console.log(`Flag changed to: ${flagName}`);
  
  switch (flagName) {
    case 'First':
    case 'Second':
    case 'Third':
      const inputs = riveInstance.stateMachineInputs("State Machine 1");
      const flagType = inputs.find(i => i.name === "Flag type");
      
      if (flagType) {
        flagType.fire();
        console.log("Rive input triggered directly");
      } else {
        console.error("Trigger input not found in Rive animation");
      }
      break;
      
    case 'hide':
      document.getElementById('canvas').style.display = 'none';
      console.log("Canvas hidden");
      break;

    case 'show':
      document.getElementById('canvas').style.display = 'block';
      console.log("Canvas shown");
      break;
      
    default:
      console.log("Unknown flag:", flagName);
  }
}

// Optional: Keep the simulate function for local testing
function simulateFlagChange(flagName) {
  handleFlagChange(flagName);
}