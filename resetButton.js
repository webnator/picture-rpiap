const rpio = require('rpio');

rpio.open(10, rpio.INPUT, rpio.PULL_DOWN);

function pollcb(pin) {
  console.log('Button event on pin %d, is now %d', pin, rpio.read(pin));
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

rpio.poll(10, pollcb, rpio.POLL_BOTH);

console.log('Started!');
console.log('Pin %d, is now %d', 12, rpio.read(12));
