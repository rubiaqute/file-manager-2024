import * as fs from "fs";
import path from "path";

export const add = (filename, currentPath) => {
    fs.writeFile(
      path.resolve(currentPath, filename),
      "",
      { flag: "wx" },
      (error) => {
        if (error) throw Error;
      }
    );
}
