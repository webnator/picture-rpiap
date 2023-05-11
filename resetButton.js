const rpio = require('rpio');

rpio.open(10, rpio.INPUT, rpio.PULL_UP);

function pollcb(pin) {
  console.log('Detected');
  /*
   * Wait for a small period of time to avoid rapid changes which
   * can't all be caught with the 1ms polling frequency.  If the
   * pin is no longer down after the wait then ignore it.
   */
  rpio.sleep(5);

  if (rpio.read(pin)) {
    console.log('Pull retired');
    return;
  }
    

  console.log('Button pressed on pin P%d', pin);
}

rpio.poll(10, pollcb, rpio.POLL_LOW);

console.log('Started!');
