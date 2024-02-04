import { cd } from "./cd.js";
import * as fs from "fs";

export const remove = async (pathToFile, currentPath) => {
    const filePath = await cd(pathToFile, currentPath);
    fs.unlink(filePath, () => {});
};
