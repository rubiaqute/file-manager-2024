import path from "path";
import * as fs from "fs";
import { cd } from "./cd.js";
import { createBrotliCompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";

export const compress = async (argsString, currentPath) => {
    const [pathToFile, pathToDestination] = argsString.split(" ");

    if (pathToFile && pathToDestination) {
      const pathFileOLd = await cd(pathToFile, currentPath);
      const pathFolderDestination = await cd(pathToDestination, currentPath);

      const pathFileNew = path.resolve(
        pathFolderDestination,
        `${path.basename(pathFileOLd)}.br`
      );

      fs.access(pathFileNew, async (err) => {
        if (err) {
          const readable = createReadStream(pathFileOLd);
          const writable = createWriteStream(pathFileNew);
          const brotli = createBrotliCompress();

          pipeline(readable, brotli, writable, () => {});
        } else throw Error;
      });
    } else throw Error;

};
