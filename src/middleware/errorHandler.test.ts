import { Request, Response } from "express";
import { errorHandler } from "./errorHandler";

describe("error handler", () => {
  it("error response format", () => {
    const req: Partial<Request> = {
      body: {
        id: "hello",
      },
    };
    const res: Partial<Response> = {
      json: jest.fn(),
    };
    const next = jest.fn();

    errorHandler(new Error("error"), req as Request, res as Response, next);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      ok: false,
      date: expect.any(Number),
      error: expect.objectContaining({
        message: "error",
      }),
    });
  });
});
