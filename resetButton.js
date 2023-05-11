const rpio = require('rpio');
const fs = require('fs');
const exec = require('child_process').exec;

rpio.open(10, rpio.INPUT, rpio.PULL_DOWN);

async function resetWifi() {
  try {
    console.log('Starting reset');
    
    const file_txt = fs.readFileSync('./assets/etc/wpa_supplicant/empty_wpa_supplicant.conf.template', { encoding: 'utf8' });
    fs.writeFileSync('/etc/wpa_supplicant/wpa_supplicant.conf', file_txt);
  
    console.log('Wifi reset successfuly. Rebooting');
    exec('reboot now');
  } catch (error) {
    console.error('Error while resetting wifi', error);
  }
}

function pollcb(pin) {
  rpio.msleep(20);

  if (rpio.read(pin)) {
    resetWifi();
  }
}

rpio.poll(10, pollcb, rpio.POLL_BOTH);

console.log('Started!');

process.on('exit', function() {
  rpio.exit();
});
