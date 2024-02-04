import { cd } from "./cd.js";
import * as crypto from "crypto";
import { createReadStream } from "fs";

export const hash = async (pathToFile, currentPath) => {
    const filePath = await cd(pathToFile, currentPath);
    const hash = crypto.createHash("sha256");
    const inputStream = createReadStream(filePath);

    inputStream.on("readable", () => {
        const data = inputStream.read();
        
        if (data) {
            hash.update(data);
        } else {
          console.log(hash.digest("hex"));
        }
    });
};
