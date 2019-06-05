var NodeWebcam = require( "node-webcam" );

class CTLNodecam {
    constructor(opts = {}) {
        this.defaults = {
            deviceSearch: '',
            saveDirectory: '',
            cameraOptions: {
                width: 1280,
                height: 720,
                quality: 100,
                output: "jpeg"
            }
        };

        this.options = Object.assign({}, this.defaults, opts);

        this._getDevice()
            .then(device => {
                this.device = device;
            })
            .catch(err => {
                throw new Error(err);
            });
    }

    _getDevice() {
        return new Promise((resolve, reject) => {
            this.listDevices()
                .then(cameras => {
                    if (!cameras || cameras.length == 0) {
                        reject("No cameras connected");
                        return;
                    }

                    const device = cameras.find(c => c.includes(this.options.deviceSearch));

                    if (device) {
                        resolve(device);
                    } else {
                        console.log("Specified device not found, using: " + cameras[0]);
                        resolve(cameras[0]);
                    }
                });
        });
    }

    listDevices() {
        return new Promise((resolve, reject) => {
            const cam = NodeWebcam.create();
            cam.list(cameras => {
                resolve(cameras);
            });
        });
    }

    takePhoto(name = 'output', overrideOpts = {}) {
        return new Promise((resolve, reject) => {
            this._getCamera(overrideOpts)
                .then(camera => {
                    camera.capture(this.options.saveDirectory + name, function( err, data ) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
        });
    }

    _getCamera(opts = {}) {
        const cameraDefaults = {
            width: 1280,
            height: 720,
            quality: 100,
            output: "jpeg"
        };

        const _opts = Object.assign(
            {},
            cameraDefaults,
            this.options.cameraOptions,
            opts
        );

        return new Promise((resolve, reject) => {
            const run = () => {
                if (this.device) {
                    _opts.device = this.device;
                    resolve(NodeWebcam.create(_opts));
                } else {
                    setTimeout(() => {
                        run();
                    }, 150);
                }
            };
            
            run();
        });
    }
}

module.exports = CTLNodecam;