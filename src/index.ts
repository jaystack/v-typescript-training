import express from 'express';
import { Asset } from './models/Asset';
import { AssetType } from './models/AssetType'
import { Person } from './models/Person'
import { createAssets, deleteAssets, getAssetById, getAssets, updateAssets } from './routes/assets';
import { createAssetTypes, deleteAssetTypes, getAssetTypes, updateAssetTypes } from './routes/assetTypes';
import { createPersons, deletePersons, getPersons, updatePersons } from './routes/persons';
import { sequelize } from './sequelize';

(async () => {
    await sequelize.sync({force: false}); 
    //await sequelize.authenticate();

    const app  = express();
    app.use(express.json());

    /************************************************************* */
    /*              ASSETTYPES                                     */
    /************************************************************* */
    
    app.get('/asset-types', getAssetTypes);
    app.post('/asset-types', createAssetTypes)
    app.post('/asset-types/:id', updateAssetTypes)
    app.delete('/asset-types/:id', deleteAssetTypes)

    /************************************************************* */
    /*              PERSONS                                        */
    /************************************************************* */

    app.get('/persons', getPersons);
    app.post('/persons', createPersons)
    app.post('/persons/:id',updatePersons)
    app.delete('/persons/:id',deletePersons)


    /************************************************************* */
    /*              ASSETS                                        */
    /************************************************************* */

    app.get('/assets', getAssets);
    app.get('/assets/:id', getAssetById);
    app.post('/assets', createAssets)
    app.post('/assets/:id', updateAssets)
    app.delete('/assets/:id',deleteAssets) 

    const listener = app.listen(3000, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:`, listener.address());
    });
})();