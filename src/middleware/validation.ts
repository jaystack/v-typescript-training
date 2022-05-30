import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export class ValidationError extends Error {
  constructor(public joiError: Joi.ValidationError) {
    super();
  }
}

export const bodyValidation =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const { value, error } = schema.validate(req.body);
      if (!error) {
        req.body = value
        return next();
      }

      next(new ValidationError(error));
    } catch (e) {
      next(e);
    }
  };
