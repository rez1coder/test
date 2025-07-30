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

    const inputs = r.stateMachineInputs('State Machine 1');
    inputs.forEach(i => {
        const inputName = i.name;
        const inputType = i.type;
        switch(inputType) {
            case rive.StateMachineInputType.Trigger:
                i.fire();
                break;
            case rive.StateMachineInputType.Number:
                i.value = 20;
                break;
        }
    });
  },
});