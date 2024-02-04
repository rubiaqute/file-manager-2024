import * as fs from "fs";
import path from "path";
import { cd } from "./cd.js";

export const copy = async (argsString, currentPath) => {
    const [pathToFile, pathToFolder] = argsString.split(" ");

    if (pathToFile && pathToFolder) {
      const pathFileOLd = await cd(pathToFile, currentPath);
      const pathFolderDestination = await cd(pathToFolder, currentPath);
      const pathFileNew = path.resolve(
        pathFolderDestination,
        path.basename(pathFileOLd)
      );

      fs.access(pathFileNew, async (error) => {
        if (error) await fs.promises.copyFile(pathFileOLd, pathFileNew);
        else throw Error;
      });
    } else throw Error;
};
