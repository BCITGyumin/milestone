/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:    Oct. 17th 2023
 * Author:          Gyumin Kim
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  fs.createReadStream(pathIn)
    .pipe(unzipper.Extract(pathOut))
    .on("error", (err) => {
      console.error("Error:", err);
    })
    .on("finish", () => {
      console.log("Extraction operation complete")
    })
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const pngFiles = files.filter((file) => path.extname(file).toLowerCase() === '.png');
        const pngFilePaths = pngFiles.map((file) => path.join(dir, file));
        resolve(pngFilePaths);
      }
    })
  })
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  const readableStream = fs.createReadStream(pathIn);
  const transformStream = new PNG({ filterType: 4 });
  const writableStream = fs.createWriteStream(pathOut);
  
  readableStream
    .pipe(transformStream)
    .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
     
            // gray algorithm
            const red = this.data[idx];
            const green = this.data[idx + 1];
            const blue = this.data[idx + 2];

            const gray = (red + green + blue) / 3;

            this.data[idx] = gray;
            this.data[idx + 1] = gray;
            this.data[idx + 2] = gray;
          }
        }

        this.pack().pipe(writableStream);
    })
    .on("error", function (err) {
        console.error("Error:", err);
    });
};


module.exports = {
  unzip,
  readDir,
  grayScale,
};
