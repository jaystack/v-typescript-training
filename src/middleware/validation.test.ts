import { Request, Response } from "express";
import { bodyValidation, ValidationError } from "./validation";
import Joi from "joi";

describe("validation", () => {
  describe("body", () => {
    it("validate string", () => {
      const req = {
        body: {
          id: "hello",
        },
      };
      const next = jest.fn();

      const schema = Joi.object({
        id: Joi.string().required(),
      });

      const validator = bodyValidation(schema);
      validator(req as Request, {} as Response, next);

      expect(next).toBeCalledTimes(1);
      expect(next).lastCalledWith();
    });

    it("validate number", () => {
      const req = {
        body: {
          id: 42,
        },
      };
      const next = jest.fn();

      const schema = Joi.object({
        id: Joi.string().required(),
      });

      const validator = bodyValidation(schema);
      validator(req as Request, {} as Response, next);

      expect(next).toBeCalledTimes(1);
      expect(next).lastCalledWith(expect.any(ValidationError));
    });

    it("validate error thrown", () => {
      const req = {
        body: {
          id: 42,
        },
      };
      const next = jest.fn();

      const schema: Partial<Joi.ObjectSchema<any>> = {
        validate: () => {
          throw new Error("somthing went wrong");
        },
      };

      const validator = bodyValidation(schema as Joi.ObjectSchema<any>);
      validator(req as Request, {} as Response, next);

      expect(next).toBeCalledTimes(1);
      expect(next).lastCalledWith(expect.objectContaining({
          message: "somthing went wrong"
      }));
    });
  });
});
