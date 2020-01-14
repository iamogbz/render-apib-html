const defaultOptions = {
    artifactsDir: "./artifacts",
    baseDir: "./",
    buildDir: ".aws-sam/build",
    deploymentBucketPrefix: "",
    template: "template.yaml",
};

const requiredOptions = {
    deploymentBucket: "This should be your S3 bucket name.",
    stackName: "This should be your cloudformation stack name",
    target: "This should be your LambdaFunctionName.",
};

const requiredEnvs = {
    AWS_ACCESS_KEY_ID: "",
    AWS_SECRET_ACCESS_KEY: "",
};

module.exports = {
    defaultOptions,
    requiredEnvs,
    requiredOptions,
};
