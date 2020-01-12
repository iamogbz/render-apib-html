import * as fs from "fs";
import * as aglio from "aglio";
import { fs as memfs } from "memfs";
import { patchFs } from "rawFs";

patchFs(fs, memfs);
const atob = (data: string) => Buffer.from(data, "base64").toString();
const btoa = (data: string) => Buffer.from(data).toString("base64");

export const handler = async (event: any) => {
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
    const html: string = await new Promise((resolve, reject) => {
        aglio.render(
            apib,
            {},
            (err: object, html: string, warnings: object) => {
                if (err) reject(err);
                // eslint-disable-next-line no-console
                if (warnings) console.warn(warnings);
                resolve(html);
            },
        );
    });

    return Object.assign(response, {
        body: btoa(html),
        bodyEncoding: "base64",
        headers,
        status: "200",
    });
};
