const fs = require('fs');
let input = "input.txt";

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    let dateRegex = /(?<=\[)(.*?)(?=\])/;
    let actionRegex = /(?<=\]\s)(.*)/;
    let idRegex = /(?<=\#)([0-9]*)/;
    let result = data.replace(/\r\n/g, '\n').split('\n');

    result.sort( (a, b) => {
        return new Date(a.match(dateRegex)[0]) - new Date(b.match(dateRegex)[0]);
    });

    let guards = {};
    let currentGuardId;
    let laziestGuard;
    let minAsleep = 0;
    let minAwake = 0;
    

    for (let i = 0; i < result.length; i++) {
        let date = new Date(result[i].match(dateRegex)[0]);
        let minute = date.getMinutes();
        let action = result[i].match(actionRegex)[0];
        currentGuardId = result[i].match(idRegex) ? result[i].match(idRegex)[0] : currentGuardId;
        if (action === 'falls asleep') {
            minAsleep = minute;
        } else if (action === 'wakes up') {
            minAwake = minute;
            for (let i = minAsleep; i < minAwake; i++) {
                if (!guards[currentGuardId].sleepMinuteCount[i]) {
                    guards[currentGuardId].sleepMinuteCount[i] = 1;
                }
                guards[currentGuardId].sleepMinuteCount[i]++;
                guards[currentGuardId].minutesSlept++;

                if (!guards[currentGuardId].gcsm)
                    guards[currentGuardId].gcsm = i;
                if (guards[currentGuardId].sleepMinuteCount[i] > guards[currentGuardId].sleepMinuteCount[guards[currentGuardId].gcsm]) {
                    guards[currentGuardId].gcsm = i;
                }
                guards[currentGuardId].gcsmCount = guards[currentGuardId].sleepMinuteCount[guards[currentGuardId].gcsm];
            }

            if (!laziestGuard) {
                laziestGuard = guards[currentGuardId];
            } else {
                if (laziestGuard.minutesSlept < guards[currentGuardId].minutesSlept)
                    laziestGuard = guards[currentGuardId];
            }
        } else {
            if (!guards[currentGuardId]) {
                guards[currentGuardId] = {
                    id: currentGuardId,
                    sleepMinuteCount: {},
                    gcsm: '',
                    gcsmCount: 0,
                    minutesSlept: 0
                }
            }
        }
    }

    let heaviestSleeper;
    for (let id in guards) {
        if (!heaviestSleeper) {
            heaviestSleeper = guards[id];
        }
            
        if (guards[id].gcsmCount > heaviestSleeper.gcsmCount) {
            heaviestSleeper = guards[id];
        }
    }
    console.log(heaviestSleeper.id * heaviestSleeper.gcsm);
    return heaviestSleeper.id * heaviestSleeper.gcsm;
});
