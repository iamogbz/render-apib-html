import * as mockEvent from "./mocks/helloWorldEvent.json";
import { handler } from "../src";

describe("entry", () => {
    it("runs a test", async () => {
        expect(await handler(mockEvent)).toMatchSnapshot();
    });
});
