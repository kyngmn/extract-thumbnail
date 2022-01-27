const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const extractFrame = require("ffmpeg-extract-frame");

const path = require("path");
const fs = require("fs");

const directoryPath = path.join(__dirname, "media");

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  console.log(files.length - 1); // DS_Store 때문에 1 뺌
  files.forEach(function (file) {
    switch (file) {
      case ".DS_Store":
        break;
      default:
        const extension = path.extname(file);
        const truefileName = path.basename(file, extension);
        console.log(truefileName);
        extractor(truefileName);
        break;
    }
  });
});

const extractor = async (name) => {
  await extractFrame({
    input: `media/${name}.mp4`,
    output: `screenshot/${name}.jpg`,
    offset: 800, // seek offset in milliseconds
  });
};
