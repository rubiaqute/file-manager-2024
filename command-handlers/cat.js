import { cd } from "./cd.js";
import { createReadStream } from "fs";

export const cat = async (pathToFile, currentPath) => {
    const filePath = await cd(pathToFile, currentPath);
    const readable = createReadStream(filePath);

    readable.pipe(process.stdout);
};
