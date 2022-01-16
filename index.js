import * as fs from 'node:fs/promises';
import DomParser from 'dom-parser';
// Probably I will reuse my code and I want to have my snippets on other place
import {
  downloadAsset,
  getIndexPage,
  imagesEmitter,
  leftFillNum,
} from './lib/helpers.js';

const targetDir = './memes';
const pageUrl = 'https://memegen-link-examples-upleveled.netlify.app';
const parser = new DomParser();

const downloadedImages = [];
let filteredImages,
  deletePromises = [];

// Use Events to avoid the global namespace 💩
imagesEmitter.on('😝', (data) => {
  if (downloadedImages.length >= 10) {
    // We can't control the chunk of data delivered by server
    // if we have downloaded more then 10 images we filter the array
    filteredImages = downloadedImages.filter((src, index) => {
      return index < 10;
    });
    // "Everybody lies" Dr.House
    Promise.all(filteredImages)
      .then(() => {
        imagesEmitter.emit('🤪');
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(
      filteredImages,
      `\nWe have ${filteredImages.length}... this is Spartaaaaaa! 💪`,
    );
  }

  // Create a DOM from the chunk of HTML
  const dom = parser.parseFromString(data);
  // Get image nodes
  const nodes = dom.getElementsByTagName('img');

  // Iterate nodes & extract img src
  nodes.forEach((node) => {
    const src = node.getAttribute('src');
    // if image src is not in array we push it
    if (downloadedImages.indexOf(src) === -1) {
      downloadedImages.push(src);
    }
  });
});

// my left ear
imagesEmitter.on('🤪', () => {
  filteredImages.forEach((src, index) => {
    // console.log(`${index}. ${src}`);
    const filename = `${leftFillNum(index, 2)}.jpg`;
    downloadAsset(src, `${targetDir}/${filename}`).catch(() => {});
  });
});

// 1. We check if there is meme folder
const initApp = async () => {
  await fs.mkdir(targetDir).catch((err) => {
    if (err.code === 'EEXIST') {
      // Folder exist try to remove images if we have
      // we make multiple promises
      try {
        fs.readdir(targetDir)
          // If promise resolved and data are fetched
          .then((filenames) => {
            deletePromises = filenames.map(function (filename) {
              return fs.unlink(`${targetDir}/${filename}`, () => {
                console.log(`Deleted ${targetDir}/${filename}`);
              });
            });
          })
          // If promise is rejected
          .catch(() => {});
      } catch (e) {}

      // "Everybody lies" Dr.House
      Promise.all(deletePromises)
        .then(() => {
          getIndexPage(pageUrl);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
};

await initApp();
