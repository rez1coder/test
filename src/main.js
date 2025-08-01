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
    flagType = inputs.find(i => i.name === "Flag type");

    winSide.value = 20;
    winFront.value = 20;

    // Move the event listener setup here, after inputs are loaded
    client.on('General.Custom', (payload) => {
        console.log('Custom event received:', payload);
        if (payload.data.event === 'changeFlag') {
            const flags = payload.data.flag;

            if (flags === 'First' || flags === 'Second' || flags === 'Third') {
                console.log('Firing flagType trigger'); // Debug log
                flagType.fire();
            }
            else if (flags === 'hide') {
                document.getElementById('canvas').style.display = 'none';
            }
        }
    });
  },
});