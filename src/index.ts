import express from 'express';
import { Asset } from './models/Asset';
import { AssetType } from './models/AssetType'
import { Person } from './models/Person'
import { sequelize } from './sequelize';

(async () => {
    await sequelize.sync({force: false}); 
    //await sequelize.authenticate();

    const app  = express();
    app.use(express.json());


    type EntityBase = {
        id: string;
    } 

    /************************************************************* */
    /*              ASSETTYPES                                     */
    /************************************************************* */
    
    app.get('/asset-types', async (req, res) => {
        try {
            const items = await AssetType.findAll();
            res.json({
                ok: true,
                date: Date.now(),
                result: items,
            });            
        } catch(error) {
            return res.status(400).json({
                ok: false,
                date: Date.now(),
                message: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    });


    app.post('/asset-types', async (req, res) => {
        try {
            const at = req.body as AssetType;
            const { id, label } = at;

            if (await AssetType.findOne({where:{id}})) throw new Error('id is not unique');        
            await AssetType.create(at);//.set(id, createAssetType(id, label));

            res.json({
                ok: true,
                date: Date.now(),
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                date: Date.now(),
                message: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    })


    app.post('/asset-types/:id', async (req, res) => {
        try {
            const payload: AssetType = req.body;
            const id = req.params.id;
            const { label } = payload;
        
            if (!await AssetType.findOne({where:{id}})) throw new Error('id not found');
        
            await AssetType.update(payload, {where: {id: id}});
            res.json({
                ok: true,
                date: Date.now(),
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                date: Date.now(),
                message: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    })

    app.delete('/asset-types/:id', async (req, res) => {
        try {
            const { params: { id } } = req;
            //const result = await assetTypes.delete(id);
            const result = await AssetType.destroy({where:{id}});
            res.json({
                ok: true,
                date: Date.now(),
                result,
            })
        } catch(error) {
            res.status(400).json({
                ok: false,
                date: Date.now(),
                message: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    })

    /************************************************************* */
    /*              PERSONS                                        */
    /************************************************************* */

    app.get('/persons', async (req, res) => {
        try {
            const items = await Person.findAll();
            res.json({ 
                ok: true,
                date: Date.now(),
                result: items
            })
        } catch(error) {
            res.status(400).json({
                ok: false,
                date: Date.now(),
                message: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    });

    app.post('/persons', async (req, res) => {
        try {
            const person = req.body as Person;
            const { id, firstName, lastName, country } = person;

            if (await Person.findOne({where:{id}})) throw new Error('id is not unique');
            
            await Person.create(person);
            return res.json({
                ok: true,
                date: Date.now(),
            });
        } catch(error) {
            return res.status(400).json({
                ok: false,
                date: Date.now(),
                message: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    })


    app.post('/persons/:id', async (req, res) => {
        try {
            const  { params: { id } } = req;
            if (!await Person.findOne({where:{id}})) throw new Error('id not found');
        
            const person = <Person>req.body;
            const { firstName, lastName, country } = person;
        
            await Person.update(person, {where:{id}})
            res.json({
                ok: true,
                date: Date.now(),
            })
        } catch(error) {
            res.status(400).json({
                ok: false,
                date: Date.now(),
                message: error instanceof Error ? error.message : 'Something went wrong'
            })
        }    
    })

    app.delete('/persons/:id', async (req, res) => {
        const { params: { id } } = req;
        const result = await Person.destroy({where:{id}});
        res.json({
            ok: true,
            date: Date.now(),
            result,
        })
    })


    /************************************************************* */
    /*              ASSETS                                        */
    /************************************************************* */

    app.get('/assets', async (req, res) => {
        try {
            const items = await Asset.findAll();
            res.json({ 
                ok: true,
                date: Date.now(),
                result: items
            })
        } catch(error) {
            res.status(400).json({
                ok: false,
                date: Date.now(),
                message: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    });
    
    app.get('/assets/:id', async (req, res) => {
        try {
            const  { params: { id } } = req;
            const items = await Asset.scope('full').findOne({where:{id}});
            res.json({ 
                ok: true,
                date: Date.now(),
                result: items
            })
        } catch(error) {
            res.status(400).json({
                ok: false,
                date: Date.now(),
                message: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    });

    app.post('/assets', async (req, res) => {
        try {
            const assets = req.body as Asset;
            const { id } = assets;

            //if (await Assets.findOne({where:{id}})) throw new Error('id is not unique');
            
            await Asset.create(assets);
            return res.json({
                ok: true,
                date: Date.now(),
            });
        } catch(error) {
            return res.status(400).json({
                ok: false,
                date: Date.now(),
                message: error instanceof Error ? error.message : 'Something went wrong'
            })
        }
    })


    app.post('/assets/:id', async (req, res) => {
        try {
            const  { params: { id } } = req;
            if (!await Asset.findOne({where:{id}})) throw new Error('id not found');
        
            const asset = <Asset>req.body;

            await Asset.update(asset, {where:{id}})
            res.json({
                ok: true,
                date: Date.now(),
            })
        } catch(error) {
            res.status(400).json({
                ok: false,
                date: Date.now(),
                message: error instanceof Error ? error.message : 'Something went wrong'
            })
        }    
    })

    app.delete('/assets/:id', async (req, res) => {
        const { params: { id } } = req;
        const result = await Asset.destroy({where:{id}});
        res.json({
            ok: true,
            date: Date.now(),
            result,
        })
    }) 

    const listener = app.listen(3000, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:`, listener.address());
    });
})();