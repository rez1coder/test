// This is the High level JS runtime for Rive
// https://rive.app/community/doc/web-js/docvlgbnS1mp

const riveInstance = new rive.Rive({
  src: "flag.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  artboard: "Artboard",
  stateMachines: "State Machine 1",

  onLoad: () => {
    riveInstance.resizeDrawingSurfaceToCanvas();

    const inputs = riveInstance.stateMachineInputs("State Machine 1");

    const winSide = inputs.find(i => i.name === "Win Side");
    const winFront = inputs.find(i => i.name === "Win front");
    const flagType = inputs.find(i => i.name === "Flag type");

    if (winSide)  winSide.value  = 20;
    if (winFront) winFront.value = 20;
    // if (flagType) flagType.fire();
    
    if (flagType) {
        console.log("Firing Flag Type trigger");
        flagType.fire();
    } else {
        console.error("Trigger 'Flag Type' not found!");
    }
  },
});
