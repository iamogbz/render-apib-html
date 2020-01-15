import * as mockEvent from "./mocks/helloWorldEvent.json";
import { handler } from "../src";

describe("entry", () => {
    it("matches response when no blueprint given", async () => {
        const event = JSON.parse(JSON.stringify(mockEvent));
        delete event.Records[0].cf.request.headers["x-blueprint"];
        expect(await handler(event)).toMatchSnapshot();
    });

    it("adds rendered blueprint to response", async () => {
        expect(await handler(mockEvent)).toMatchSnapshot();
    });
});
