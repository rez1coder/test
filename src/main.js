// ========== Rive Animation Setup ==========
const riveInstance = new rive.Rive({
  src: "flag.riv", // Make sure this path is correct
  canvas: document.getElementById("canvas"),
  autoplay: true,
  artboard: "Artboard",
  stateMachines: "State Machine 1",
  onLoad: () => {
    console.log("Rive animation loaded!");
    riveInstance.resizeDrawingSurfaceToCanvas();

    // Set initial values for inputs (if needed)
    const inputs = riveInstance.stateMachineInputs("State Machine 1");
    const winSide = inputs.find(i => i.name === "Win Side");
    const winFront = inputs.find(i => i.name === "Win front");
    
    if (winSide) winSide.value = 20;
    if (winFront) winFront.value = 20;
  },
});

// ========== Event Simulation ==========
// Simulate a Streamer.bot "changeFlag" event
function simulateFlagChange(flagName) {
  const event = new CustomEvent('General.Custom', {
    detail: {
      event: 'changeFlag',
      flag: flagName
    }
  });
  window.dispatchEvent(event);
}

// ========== Event Listener ==========
window.addEventListener('General.Custom', (e) => {
  const payload = e.detail;
  console.log("Received event:", payload);

  if (payload.event === 'changeFlag') {
    console.log(`Flag changed to: ${payload.flag}`);
    
    switch (payload.flag) {
      case 'First':
      case 'Second':
      case 'Third':
        // Trigger animation by simulating click
        document.getElementById('canvas').click();
        console.log("Triggered animation click");
        break;
        
      case 'hide':
        document.getElementById('canvas').style.display = 'none';
        console.log("Canvas hidden");
        break;
        
      default:
        console.log("Unknown flag:", payload.flag);
    }
  }
});

// ========== Test Controls ==========
// Call these functions to test different scenarios
function testFirstFlag() {
  simulateFlagChange('First');
}

function testSecondFlag() {
  simulateFlagChange('Second');
}

function testHide() {
  simulateFlagChange('hide');
}

function testShow() {
  document.getElementById('canvas').style.display = 'block';
  console.log("Canvas shown");
}

// ========== Run Initial Tests ==========
// Uncomment to auto-test when page loads
// setTimeout(() => {
//   testFirstFlag();
//   setTimeout(testHide, 2000);
//   setTimeout(testShow, 4000);
// }, 1000);