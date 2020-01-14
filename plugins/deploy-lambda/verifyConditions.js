/* eslint-disable @typescript-eslint/no-var-requires */
const { maybeThrowErrors, verifyConfig } = require("./utils");

const verifyConditions = options => {
    const verified = verifyConfig(options);
    const { stackName, deploymentBucket, target } = verified;
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

    const errors = [];
    if (!AWS_ACCESS_KEY_ID) {
        errors.push("AWS_ACCESS_KEY_ID is missing from the environment");
    }
    if (!AWS_SECRET_ACCESS_KEY) {
        errors.push("AWS_SECRET_ACCESS_KEY is missing from the environment");
    }
    if (!deploymentBucket) {
        errors.push(
            "No 'deploymentBucket' was specified in package.json. This should be your S3 bucket name.",
        );
    }
    if (!stackName) {
        errors.push("No 'stackName' was specified in package.json.");
    }
    if (!target) {
        errors.push(
            "No 'target' was specified in package.json. This should be your LambdaFunctionName.",
        );
    }
    maybeThrowErrors(errors);
};

module.exports = {
    verifyConditions,
};
