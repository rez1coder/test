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

    winSide.value = 20;
    winFront.value = 20;
  },
});

// Event listener outside onLoad
client.on('General.Custom', (payload) => {   
    if (payload.data.event === 'changeFlag') {
        console.log(payload);
        const flags = payload.data.flag;

        if (flags === 'First' || flags === 'Second' || flags === 'Third') {
            // Simulate a click event
            document.getElementById('canvas').click();
        } else if (flags === 'hide') {
            document.getElementById('canvas').style.display = 'none';
        }
    }
});