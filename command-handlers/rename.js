import * as fs from "fs";
import path from "path";
import { cd } from "./cd.js";

export const rename = async (argsString, currentPath) => {
    const [pathToFile, fileName] = argsString.split(" ");

    if (pathToFile && fileName) {
      const oldFilePath = await cd(pathToFile, currentPath);
      const newFilePath = path.resolve(path.dirname(oldFilePath), fileName);

      fs.access(oldFilePath, (err) => {
        if (err) throw Error
        fs.rename(oldFilePath, newFilePath, () => {});
      });
    } else throw Error
};
