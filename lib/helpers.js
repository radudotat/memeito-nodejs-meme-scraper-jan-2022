import events from 'node:events';
import { createWriteStream } from 'node:fs';
import * as fs from 'node:fs/promises';
import https from 'node:https';

export const imagesEmitter = new events.EventEmitter();

export function leftFillNum(num, targetLength) {
  // Pads the current string from the start with a given string
  // and returns a new string of the length targetLength.
  return num.toString().padStart(targetLength, 0);
}

export function getIndexPage(url) {
  const pendingRequest = https.get(url, (res) => {
    res.setEncoding('utf8');
    let body = '';
    res.on('data', (data) => {
      body += data;
      imagesEmitter.emit('😝', body);
    });
    res.on('end', () => {
      // I'm already gone 🤫
    });
  });
  // my right ear
  imagesEmitter.on('🤪', () => {
    // I know what I'm doing 🤣
    pendingRequest.destroy();
  });
}

export function downloadAsset(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest, { flags: 'wx' });

    const request = https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
      } else {
        file.close();
        fs.unlink(dest, () => {}).catch(() => {});
        reject(
          `Server responded with ${response.statusCode}: ${response.statusMessage}`,
        );
      }
    });

    request.on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {}).catch(() => {});
      reject(err.message);
    });

    file.on('finish', () => {
      resolve();
    });

    file.on('error', (err) => {
      file.close();

      if (err.code === 'EEXIST') {
        reject('File already exists');
      } else {
        fs.promises.unlink(dest, () => {}).catch(() => {});
        reject(err.message);
      }
    });
  });
}
