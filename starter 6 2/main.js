const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:    Oct 17th 2023
 * Author:          Gyumin Kim
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

IOhandler.unzip(zipFilePath, pathUnzipped)
  .then(() => IOhandler.readDir(pathUnzipped))
  .then((array) => {
    const grayscalingPromises = array.map((pngPath) =>
      IOhandler.grayScale(pngPath, pathProcessed)
    );
    return Promise.all(grayscalingPromises);
  })
  .then(() => {
    console.log('Successfully Generated');
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });

// Step 1: Read the zip file
// Step 2: Unzip the zip file
// Step 3: Read all png images from unzipped folder
// Step 4: Send them to the grayscale filter function
// Step 5: After ALL IMAGES hae SUCCESSFULLY been grayscaled, show a sucess message.
// ALL ERRORS MUST SHOW IN .catch in PROMISE CHAIN