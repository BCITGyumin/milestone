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
const unzipper = require("unzipper");
const fs = require("fs");
const PNG = require("pngjs").PNG;
const transformStream = new PNG({});

// Step 1: Unzip myfile.zip
// fs.createReadStream(zipFilePath)
//     .pipe(unzipper.Extract({path: "./unzipped"}));

fs.createReadStream("./unzipped/in.png")
    .pipe(transformStream)
    .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
     
            // invert color
            this.data[idx] = 255 - this.data[idx];
            this.data[idx + 1] = 255 - this.data[idx + 1];
            this.data[idx + 2] = 255 - this.data[idx + 2];
     
            // and reduce opacity
            this.data[idx + 3] = this.data[idx + 3] >> 1;
          }
        }
     
        this.pack().pipe(fs.createWriteStream("out.png"));
      })
    .on("error", function (err) {
        console.error("Error unzipping:", err);
    });

// Step 1: Read the zip file
// Step 2: Unzip the zip file
// Step 3: Read all png images from unzipped folder
// Step 4: Send them to the grayscale filter function
// Step 5: After ALL IMAGES hae SUCCESSFULLY been grayscaled, show a sucess message.
// ALL ERRORS MUST SHOW IN .catch in PROMISE CHAIN