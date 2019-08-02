import * as path from "path";

const modifiedFiles = new Set<any>();
const writeMethods = new Set(["writeFile", "writeFileSync"]);

export const patchFs = (readOnlyFs: any, readAndWriteFs: any) => {
    const props = Object.keys(readOnlyFs);
    props.forEach(p => {
        if (typeof readOnlyFs[p] !== "function") return;
        const isWriteMethod = writeMethods.has(p);
        const readOnlyMethod = readOnlyFs[p].bind(readOnlyFs);
        const readAndWriteMethod = readAndWriteFs[p];
        readOnlyFs[p] = (...args: any[]) => {
            if (isWriteMethod) {
                try {
                    const dirPath = path.dirname(args[0]);
                    if (readOnlyFs.existsSync(dirPath)) {
                        readAndWriteFs.mkdirSync(dirPath, { recursive: true });
                    }
                    return readAndWriteMethod(...args);
                } finally {
                    modifiedFiles.add(args[0]);
                }
            }
            if (modifiedFiles.has(args[0])) {
                return readAndWriteMethod(...args);
            }
            try {
                return readOnlyMethod(...args);
            } catch (e) {
                try {
                    return readAndWriteMethod(...args);
                } catch (e) {
                    return null;
                }
            }
        };
    });
};
