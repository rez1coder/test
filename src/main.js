const client = new StreamerbotClient();

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

    winSide.value  = 20;
    winFront.value = 20;

    // Listen for Streamer.bot events
    client.on('General.Custom', (payload) => {
        if (payload.data.event === 'changeFlag') {
            const flags = payload.data.flag;

            if (flags === 'First' || flags === 'Second' || flags === 'Third') {
                flagType.fire();
            }
            else if (flags === 'hide') {
                document.getElementById('canvas').style.display = 'none';
            }
        }
    });
  },
});