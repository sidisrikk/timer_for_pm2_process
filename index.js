var later = require('later');
later.date.localTime();

var pm2 = require('pm2');

const PROCESS_NAME = 'hello'
const FULL_PATH = 'path/to/hello.js'

later.setInterval(onCheckind, later.parse.text('at 7:00 am on Sat'))
later.setInterval(offCheckind, later.parse.text('at 9:00 am on Sat'));

async function onCheckind() {
    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        // pm2 start checkind --max-memory-restart 800M
        pm2.start({
            script: FULL_PATH,
            max_memory_restart: '100M',
        }, function (err, apps) {
            pm2.disconnect();   // Disconnects from PM2
            if (err) throw err
            console.log(`${new Date()} - start process ${apps[0].name}`);
        });
    });
};

async function offCheckind() {

    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        // stop checkind 
        pm2.stop(PROCESS_NAME, function (err, apps) {
            pm2.disconnect();   // Disconnects from PM2
            if (err) throw err
            console.log(`${new Date()} - stop process ${apps[0].name}`);
        });
    });
};