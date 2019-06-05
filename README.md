# CTLNodecam

A small library to abstract taking photos using the command line with node.js

## Installation

To use this you need to install the package node-webcam. However this has a hard dependency on a package installed through homebrew. Annoying I know

```
// If you havent installed homebrew, do that here:
// https://brew.sh/
brew install imagesnap

npm install node-webcam
```

## API

**CTLNodecam(options)**
- *options* - Options object for the webcam

**options**

| Key             | Value                                          | Default |
|-----------------|------------------------------------------------|---------|
| deviceSearch    | A string to match the webcam name              | null    |
| saveDirectory   | The folder to save the file into               | null    |
| cameraOptions   | An object for the camera options               | Object  |

**cameraOptions**

| Key             | Value                                          | Default |
|-----------------|------------------------------------------------|---------|
| width           | The width of the photo                         | 1280    |
| height          | The height of the photo                        | 720     |
| quality         | The quality of the photo                       | 100     |
| output          | The output filetype ('jpeg'/'png')             | 'jpeg'  |


**listDevices()**
- *@returns Promise*


**takePhoto(filename, options)**
- *filename* The filename to save the photo as
- *options* Same as constructor options, but able for overrides
- *@returns Promise*


## Example

Look into the `examples/` folder