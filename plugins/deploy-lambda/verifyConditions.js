/* eslint-disable @typescript-eslint/no-var-requires */
const { requiredOptions } = require("./constants");
const { maybeThrowErrors, requiredEnvs, verifyOptions } = require("./utils");

const verifyConditions = options => {
    const verified = verifyOptions(options);
    const errors = [];

    Object.keys(requiredEnvs).forEach(envVarName => {
        if (!process.env[envVarName]) {
            errors.push(`${envVarName} is missing from the environment`);
        }
    });
    Object.keys(requiredOptions).forEach(option => {
        if (!verified[option]) {
            errors.push(
                `No '${option}' was specified in package.json. ${requiredOptions[option]}`,
            );
        }
    });
    maybeThrowErrors(errors);
};

module.exports = {
    verifyConditions,
};
