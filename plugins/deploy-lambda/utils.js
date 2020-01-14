/* eslint-disable @typescript-eslint/no-var-requires */
const AggregateError = require("aggregate-error");

const maybeThrowErrors = errors => {
    if (errors.length > 0) {
        throw new AggregateError(errors);
    }
};

const defaultOptions = {
    artifactsDir: "./artifacts",
    baseDir: "./",
    buildDir: ".aws-sam/build",
    deploymentBucketPrefix: "",
};

const verifyConfig = (options, required = []) => {
    const errors = [];
    const mergedOptions = { ...defaultOptions, ...options };
    required.forEach(prop => {
        if (mergedOptions[prop] === undefined) {
            errors.push(`${prop} is missing from the options`);
        }
    });
    maybeThrowErrors(errors);
    return mergedOptions;
};

module.exports = {
    maybeThrowErrors,
    verifyConfig,
};
