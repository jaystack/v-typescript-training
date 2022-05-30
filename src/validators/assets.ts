import Joi from "joi";

export const createAssetSchema = Joi.object({
  name: Joi.string().min(3).max(256).required(),
  assetTypeId: Joi.string().max(30).required(),
  personId: Joi.string().max(30).required(),
});
