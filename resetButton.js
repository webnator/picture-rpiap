const rpio = require('rpio');
const fs = require('fs');
const exec = require('child_process').exec;

rpio.open(10, rpio.INPUT, rpio.PULL_DOWN);

function pollcb(pin) {
  rpio.msleep(20);

  if (rpio.read(pin)) {
    console.log('Starting reset');
    
    const file_txt = fs.readFileSync('./assets/etc/wpa_supplicant/empty_wpa_supplicant.conf.template', { encoding: 'utf8' });
    fs.writeFileSync(file_name, file_txt);

    console.log('Wifi reset successfuly. Rebooting');
    exec('reboot');

    process.exit(0);
  }
}

rpio.poll(10, pollcb, rpio.POLL_BOTH);

console.log('Started!');
