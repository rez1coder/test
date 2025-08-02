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

function simulateFlagChange(flagName) {
  const event = new CustomEvent('General.Custom', {
    detail: {
      event: 'changeFlag',
      flag: flagName
    }
  });
  window.dispatchEvent(event);
}

window.addEventListener('General.Custom', (e) => {
  const payload = e.detail;
  console.log("Received event:", payload);

  if (payload.event === 'changeFlag') {
    console.log(`Flag changed to: ${payload.flag}`);
    
    switch (payload.flag) {
      case 'First':
      case 'Second':
      case 'Third':
        // document.getElementById('canvas').click();
        // console.log("Triggered animation click");
        const inputs = riveInstance.stateMachineInputs("State Machine 1");
        const flagType = inputs.find(i => i.name === "Flag type"); // Replace with your input name
        
        if (flagType) {
          flagType.fire(); // Manually fire the trigger
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
        console.log("Unknown flag:", payload.flag);
    }
  }
});