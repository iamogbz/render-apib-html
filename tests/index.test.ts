import { handler } from "../src";
import * as mockEvent from "./mocks/helloWorldEvent.json";

describe("entry", () => {
    it("runs a test", async () => {
        expect(await handler(mockEvent)).toMatchSnapshot();
    });
});
