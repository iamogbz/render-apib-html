/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const { verifyConfig } = require("./utils");

const prepare = (options, { nextRelease, logger }) => {
    if (!nextRelease.version) {
        logger.log("Skipping prepare as there is no next release version");
    }
    const {
        artifactsDir,
        baseDir,
        buildDir,
        target,
        template,
    } = verifyConfig(options, ["artifactsDir", "target"]);

    const buildFunctionPath = path.join(buildDir, target);
    execSync(`sam build -t ${template} -s ${baseDir} -b ${buildDir}`);
    if (!fs.existsSync(buildFunctionPath)) {
        throw new Error(`Nothing built at: ${buildFunctionPath}`);
    }
    logger.log("Function built at location: %s", buildFunctionPath);

    const zippedFunctionFile = path.join(artifactsDir, `${target}.zip`);
    execSync(`zip -r ${zippedFunctionFile} ${buildFunctionPath}`);
    logger.log("Function zipped at: %s", zippedFunctionFile);
};

module.exports = {
    prepare,
};
