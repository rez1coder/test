const client = new StreamerbotClient();

let riveInstance;
let inputs;
let winSide, winFront, flagType;

riveInstance = new rive.Rive({
  src: "flag.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  artboard: "Artboard",
  stateMachines: "State Machine 1",

  onLoad: () => {
    riveInstance.resizeDrawingSurfaceToCanvas();

    // Store inputs in variables accessible outside onLoad
    inputs = riveInstance.stateMachineInputs("State Machine 1");
    winSide = inputs.find(i => i.name === "Win Side");
    winFront = inputs.find(i => i.name === "Win front");
    flagType = inputs.find(i => i.name === "Flag type");

    winSide.value = 20;
    winFront.value = 20;
  },
});

// Listen for Streamer.bot events outside onLoad
client.on('General.Custom', (payload) => {
    if (payload.data.event === 'changeFlag') {
        const flags = payload.data.flag;

        if (flags === 'First' || flags === 'Second' || flags === 'Third') {
            flagType?.fire(); // Use optional chaining in case inputs aren't loaded yet
        }
        else if (flags === 'hide') {
            document.getElementById('canvas').style.display = 'none';
        }
    }
});