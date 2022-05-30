import Joi from "joi";

export const createAssetTypeSchema = Joi.object({
  id: Joi.string().max(30).required(),
  label: Joi.string().min(3).max(256).required(),
});

export const updateAssetTypeSchema = Joi.object({
  label: Joi.string().min(3).max(256).required(),
});
