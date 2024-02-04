import * as fs from "fs";
import * as path from "path";

export const cd = async (pathName, currentPath) => {
    const resolvedPath = path.isAbsolute(pathName)
      ? path.resolve(pathName)
      : path.resolve(currentPath, pathName);

      return await new Promise((resolve, reject) => {
        fs.access(resolvedPath, (error) => {
          if (error) reject();
          else resolve(resolvedPath);
        });
      });
};
