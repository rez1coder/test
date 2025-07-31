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
    const winFront = inputs.find(i => i.name === "Win Front");
    const flagType = inputs.find(i => i.name === "Flag Type");

    if (winSide)  winSide.value  = 20;
    if (winFront) winFront.value = 20;

    flagType.fire();
    setTimeout(() => flagType.fire(), 1000);
    setTimeout(() => flagType.fire(), 2000);
  },
});
