import express from 'express';
import * as assetTypeRoutes from './routes/assetTypes';
import * as personRoutes from './routes/persons';
import * as assetRoutes from './routes/assets';

const app  = express();
app.use(express.json());

/************************************************************* */
/*              ASSETTYPES                                     */
/************************************************************* */
app.get('/asset-types', assetTypeRoutes.index);
app.post('/asset-types', assetTypeRoutes.postNew);
app.post('/asset-types/:id', assetTypeRoutes.postUpdate);
app.delete('/asset-types/:id',assetTypeRoutes.deleteItem);

/************************************************************* */
/*              PERSONS                                        */
/************************************************************* */
app.get('/persons', personRoutes.index);
app.post('/persons', personRoutes.postNew);
app.post('/persons/:id', personRoutes.postUpdate);
app.delete('/persons/:id', personRoutes.deleteItem);

/************************************************************* */
/*              ASSETS                                         */
/************************************************************* */
app.get('/assets', assetRoutes.index);
app.post('/assets', assetRoutes.postNew);
app.post('/assets/:id', assetRoutes.postUpdate);
app.delete('/assets/:id', assetRoutes.deleteItem);

const listener = app.listen(3000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:`, listener.address());
});