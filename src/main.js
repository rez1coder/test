const client = new StreamerbotClient();

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

    // Move the input access inside onLoad callback
    const inputs = riveInstance.stateMachineInputs("State Machine 1");
    const winSide = inputs.find(i => i.name === "Win Side");
    const winFront = inputs.find(i => i.name === "Win front");
    const flagType = inputs.find(i => i.name === "Flag type");

    if (winSide)  winSide.value  = 20;
    if (winFront) winFront.value = 20;

    // Listen for Streamer.bot events
    client.on('General.Custom', (payload) => {
        if (payload.data.event === 'changeFlag') {
            const eventValue = payload.data.value;

            if (eventValue === 'first' || eventValue === 'second' || eventValue === 'third') {
                // Fire the Rive trigger when the event occurs
                if (flagType) flagType.fire();
            }

            if (eventValue === 'hide') {
                const canvas = document.getElementById('canvas');
                canvas.style.display = 'none';
            }
        }
    });
  },
});