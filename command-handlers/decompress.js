import path from "path";
import * as fs from "fs";
import { cd } from "./cd.js";
import { createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";

export const decompress = async (argsString, currentPath) => {
    const [pathToFile, pathToFolder] = argsString.split(" ");

    if (pathToFile && pathToFolder) {
      const pathFileOLd = await cd(pathToFile, currentPath);
      const pathFolderDestination = await cd(pathToFolder, currentPath);

      const pathFileNew = path.resolve(
        pathFolderDestination,
        path.basename(pathFileOLd).slice(0, -3)
      );

      fs.access(pathFileNew, async (err) => {
        if (err) {
          const readable = createReadStream(pathFileOLd);
          const writable = createWriteStream(pathFileNew);
          const brotli = createBrotliDecompress();

          pipeline(readable, brotli, writable, () => {});
        } else throw Error
      });
    } else throw Error
};
