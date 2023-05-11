const rpio = require('rpio');
const { write_template_to_file } = require('./app/template_writer');
const exec = require("child_process").exec;

rpio.open(10, rpio.INPUT, rpio.PULL_DOWN);



function pollcb(pin) {
  rpio.msleep(20);

  if (rpio.read(pin)) {
    write_template_to_file(
      "./assets/etc/wpa_supplicant/empty_wpa_supplicant.conf.template",
      "/etc/wpa_supplicant/wpa_supplicant.conf",
      {}, () => null);
    
    exec('reboot');
    process.exit(0);
  }
}

rpio.poll(10, pollcb, rpio.POLL_BOTH);

console.log('Started!');
console.log('Pint %d, is now %d', 12, rpio.read(12));
