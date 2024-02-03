import * as fs from "fs";

export const ls = (currentPath) => {
        fs.access(currentPath, () => {
            fs.readdir(currentPath, { withFileTypes: true }, (error, dirents) => {
                const folderContentData = dirents.map((contentItem) => ({
                    name: contentItem.name,
                    type: contentItem.isDirectory() ? "directory" : "file",
                })).sort((a, b)=> {
                        if (a.type === "directory" && b.type === "file") return -1
                        if (a.type === "file" && b.type === "directory") return 1;
                        if (a.type === b.type) {
                            return a.name.localeCompare(b.name);
                        }
                }) 
                
                console.table(folderContentData || "Nothing to show");
            });
        });
};
