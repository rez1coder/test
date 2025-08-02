const riveInstance = new rive.Rive({
  src: "flag.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  artboard: "Artboard",
  stateMachines: "State Machine 1",

  onLoad: () => {
    console.log("Rive animation loaded!");
    riveInstance.resizeDrawingSurfaceToCanvas();
    document.getElementById('canvas').style.display = 'none';

    const inputs = riveInstance.stateMachineInputs("State Machine 1");
    const winSide = inputs.find(i => i.name === "Win Side");
    const winFront = inputs.find(i => i.name === "Win front");
    
    winSide.value = 20;
    winFront.value = 20;
  },
});

function toggleCanvas(show) {
  document.getElementById('canvas').style.display = show ? 'block' : 'none';
  console.log(`Canvas ${show ? 'shown' : 'hidden'}`);
}

function handleFlagChange(flagName) {
    // console.log(`Flag changed to: ${flagName}`);
    const inputs = riveInstance.stateMachineInputs("State Machine 1");
    const flagType = inputs.find(i => i.name === "Flag type");
  
    switch (flagName) {
    case 'First':
        toggleCanvas(true);
        flagType.fire();
        break;

    case 'Second':
        flagType.fire();
        break;

    case 'Third':
        flagType.fire();
        setTimeout(() => {
            toggleCanvas(false);
            console.log("Canvas hidden after 5s");
        }, 5000);
        break;
        
    default:
        console.log("Unknown flag:", flagName);
    }
}

const client = new StreamerbotClient();
client.on('General.Custom', (payload) => {
  // console.log("Received Streamer.bot event:", payload);
  
  if (payload.event === 'changeFlag') {
    handleFlagChange(payload.flag);
  }
});