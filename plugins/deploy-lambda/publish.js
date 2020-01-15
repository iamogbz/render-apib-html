/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process");

const { verifyOptions } = require("./utils");

const publish = async options => {
    const {
        deploymentBucket,
        deploymentBucketPrefix,
        region,
        stackName,
        template,
    } = verifyOptions(options, [
        "deploymentBucket",
        "deploymentBucketPrefix",
        "region",
        "stackName",
        "template",
    ]);
    execSync(
        `sam deploy --region ${region} --template-file ${template} ` +
            `--stack-name ${stackName} --s3-bucket ${deploymentBucket} ` +
            `--s3-prefix ${deploymentBucketPrefix} --capabilities CAPABILITY_IAM`,
    );
};

module.exports = {
    publish,
};
