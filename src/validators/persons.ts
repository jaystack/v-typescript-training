import Joi from "joi";

export const createPersonSchema = Joi.object({
  id: Joi.string().max(30).required(),
  firstName: Joi.string().min(3).max(256).required(),
  lastName: Joi.string().min(3).max(256).required(),
  country: Joi.string().min(1).max(8).required(),
});

export const updatePersonSchema = Joi.object({
  firstName: Joi.string().min(3).max(256).required(),
  lastName: Joi.string().min(3).max(256).required(),
  country: Joi.string().min(1).max(8).required(),
});