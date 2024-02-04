import { copy } from "./copy.js";
import { remove } from "./remove.js";

export const move = async (argsString, currentPath) => {
    const [pathToFile] = argsString.split(" ");

    await copy(argsString, currentPath);
    await remove(pathToFile, currentPath);
};
