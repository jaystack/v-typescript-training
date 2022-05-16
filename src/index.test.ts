import { Greeter } from "./greeter";

describe('first test', ()=>{
    it("should run greet fn", () => {
        const g = new Greeter('Test');
        const result = g.greet();
        expect(result).toEqual('Hello, Test');
      });
})
