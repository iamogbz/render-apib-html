import { execSync } from "child_process";
import { quote } from "shell-quote";
import { CloudFrontResponseEvent, CloudFrontResultResponse } from "aws-lambda";

const encoding = "base64" as const;
const atob = (data: string): string => Buffer.from(data, encoding).toString();

const apibToHtml = (apib: string): string => {
    const safeApib = quote([apib]);
    const apibToHtmlBin =
        "node ./node_modules/aglio/bin/aglio.js -t onlicar-lambda -i - -o -";
    return execSync(`echo ${safeApib} | ${apibToHtmlBin}`).toString();
};

export const handler = async (
    event: DeepPartial<CloudFrontResponseEvent>,
): Promise<CloudFrontResultResponse> => {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(event));
    const response = event.Records[0].cf.response;
    const headers = Object.assign(
        response.headers || {},
        ...[
            ["Access-Control-Allow-Headers", "X-Blueprint"],
            ["Access-Control-Allow-Methods", "GET, HEAD, OPTIONS"],
            ["Access-Control-Allow-Origin", "*"],
        ].map(([key, value]) => ({ [key.toLowerCase()]: [{ key, value }] })),
    );

    const request = event.Records[0].cf.request;
    if (!request.headers["x-blueprint"]) {
        return Object.assign(response, {
            body: "No api blueprint supplied",
            headers,
            status: "200",
        });
    }

    const apib = atob(request.headers["x-blueprint"][0].value);
    const html = apibToHtml(apib);

    return Object.assign(response, {
        body: html,
        headers,
        status: "200",
    });
};
