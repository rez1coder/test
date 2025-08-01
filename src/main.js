const client = new StreamerbotClient();

let riveInstance;
let inputs, winSide, winFront, flagType;

riveInstance = new rive.Rive({
  src: "flag.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  artboard: "Artboard",
  stateMachines: "State Machine 1",

  onLoad: () => {
    riveInstance.resizeDrawingSurfaceToCanvas();

    inputs = riveInstance.stateMachineInputs("State Machine 1");
    winSide = inputs.find(i => i.name === "Win Side");
    winFront = inputs.find(i => i.name === "Win front");

    winSide.value = 20;
    winFront.value = 20;
  },
});

// Event listener outside onLoad
client.on('General.Custom', (payload) => {
    if (payload.data.event === 'changeFlag') {
        inputs = riveInstance.stateMachineInputs("State Machine 1");
        flagType = inputs.find(i => i.name === "Flag type");

        const flags = payload.data.flag;

        if (flags === 'First' || flags === 'Second' || flags === 'Third') {
            if (flagType) {
                console.log('Firing flagType trigger'); // Debug log
                flagType.fire();
            } else {
                console.log('flagType not loaded yet'); // Debug log
            }
        }
        else if (flags === 'hide') {
            document.getElementById('canvas').style.display = 'none';
        }
    }
});