/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process");

const { verifyOptions: verifyOptions } = require("./utils");

const publish = async options => {
    const {
        deploymentBucket,
        deploymentBucketPrefix,
        stackName,
        template,
    } = verifyOptions(options, [
        "deploymentBucket",
        "deploymentBucketPrefix",
        "stackName",
        "template",
    ]);
    execSync(
        `sam deploy --template-file ${template}` +
            `--stack-name ${stackName} --s3-bucket ${deploymentBucket}` +
            `--s3-prefix ${deploymentBucketPrefix} --capabilities CAPABILITY_IAM`,
    );
};

module.exports = {
    publish,
};
