const CTLNodecam = require('../CTLNodecam/CTLNodecam');

const camera = new CTLNodecam({
    deviceSearch: 'USB',
    saveDirectory: __dirname + '/'
});

// camera.listDevices().then(console.log);

camera.takePhoto()
    .then(file => {
        console.log("Photo taken successfully");
        console.log(file);
    });