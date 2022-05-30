import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { bodyValidation } from "./middleware/validation";
import {
  createAssets,
  deleteAssets,
  getAssetById,
  getAssets,
  updateAssets,
} from "./routes/assets";
import {
  createAssetTypes,
  deleteAssetTypes,
  getAssetTypes,
  updateAssetTypes,
} from "./routes/assetTypes";
import {
  createPersons,
  deletePersons,
  getPersons,
  updatePersons,
} from "./routes/persons";
import { sequelize } from "./sequelize";
import { createAssetSchema } from "./validators/assets";
import {
  createAssetTypeSchema,
  updateAssetTypeSchema,
} from "./validators/assetTypes";
import { createPersonSchema, updatePersonSchema } from "./validators/persons";

(async () => {
  await sequelize.sync({ force: true });
  //await sequelize.authenticate();

  const app = express();
  app.use(express.json());

  /************************************************************* */
  /*              ASSETTYPES                                     */
  /************************************************************* */

  app.get("/asset-types", getAssetTypes);
  app.post(
    "/asset-types",
    bodyValidation(createAssetTypeSchema),
    createAssetTypes
  );
  app.post(
    "/asset-types/:id",
    bodyValidation(updateAssetTypeSchema),
    updateAssetTypes
  );
  app.delete("/asset-types/:id", deleteAssetTypes);

  /************************************************************* */
  /*              PERSONS                                        */
  /************************************************************* */

  app.get("/persons", getPersons);
  app.post("/persons", bodyValidation(createPersonSchema), createPersons);
  app.post("/persons/:id", bodyValidation(updatePersonSchema), updatePersons);
  app.delete("/persons/:id", deletePersons);

  /************************************************************* */
  /*              ASSETS                                        */
  /************************************************************* */

  app.get("/assets", getAssets);
  app.get("/assets/:id", getAssetById);
  app.post("/assets", bodyValidation(createAssetSchema), createAssets);
  app.post("/assets/:id", bodyValidation(createAssetSchema), updateAssets);
  app.delete("/assets/:id", deleteAssets);

  app.use(errorHandler);

  const listener = app.listen(3000, () => {
    console.log(
      `⚡️[server]: Server is running at http://localhost:`,
      listener.address()
    );
  });
})();
