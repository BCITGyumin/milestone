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
    .on("error", () => {
      console.error("Error:", err);
    })
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      rejects(err);
    } else {
      const pngFiles = files.filter((file) => path.extname(file).toLowerCase() === '.png');
      const pngFilePaths = pngFiles.map((file) => path.join(dir, file));
      resolve(pngFilePaths);
    }
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
const grayScale = (pathIn, pathOut) => {};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
