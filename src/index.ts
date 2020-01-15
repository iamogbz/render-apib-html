import { CloudFrontResponseEvent, CloudFrontResultResponse } from "aws-lambda";

const encoding = "base64";
const atob = (data: string): string => Buffer.from(data, encoding).toString();
const btoa = (data: string): string => Buffer.from(data).toString(encoding);

export const handler = async (
    event: CloudFrontResponseEvent,
): Promise<CloudFrontResultResponse> => {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(event));
    return {
        body: atob(btoa("Hello world!")),
        status: "200",
    };
};
