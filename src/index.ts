import express from 'express';
import { where } from 'sequelize/types';
import { AssetType } from './models/AssetType'
import { Person } from './models/Person'
import { sequelize } from './sequelize';

(async () => {
    await sequelize.sync({force: true}); 
    const app  = express();
    app.use(express.json());


    type EntityBase = {
        id: string;
    } 

    class Repository<T extends EntityBase> {
        public store: Map<string, T>

        constructor(items: T[]) {
            this.store = new Map(items.map(item => [item.id, item]))
        }

        allItems = async () => [...this.store.values()]

        hasKey = async (key: string) => this.store.has(key)

        set =  async (key: string, item: T) => this.store.set(key, item)

        // returns true if key existed
        delete = async (key: string) => this.store.delete(key)
    }


    /************************************************************* */
    /*              ASSETTYPES                                     */
    /************************************************************* */
    
    // type AssetType = EntityBase & {
    //     label: string;
    // }

    // const assetTypes = new Repository<AssetType>(
    //     [
    //         { id: 'mac', label: 'Apple Mac' },
    //         { id: 'pc', label: 'Windows PC' },
    //         { id: 'iphone', label: 'Apple Phone' },
    //     ]
    // );


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

    // function createAssetType(id: string, label: string): AssetType {
    //     if (!id) throw new Error('invalid assetId');
    //     if (!label) throw new Error('invalid assetLabel');
        
    //     return {
    //         id,
    //         label,
    //     }
    // }


    app.post('/asset-types', async (req, res) => {
        try {
            const at = req.body as AssetType;
            const { id, label } = at;

            //if (await assetTypes.hasKey(id)) throw new Error('id is not unique');        
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
        
            //if (!await assetTypes.hasKey(id)) throw new Error('id not found');
        
            //await assetTypes.set(id, createAssetType(id, label));
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

    // type Person = EntityBase & {
    //     firstName: string;
    //     lastName: string;
    //     country: string;
    // }

    // const persons = new Repository<Person>(
    //     [
    //         { id: 'z', firstName: 'Peter', lastName: 'Zentai', country: 'UK' },
    //         { id: 'np', firstName: 'Peter', lastName: 'Nochta', country: 'HU' },
    //     ]
    // );

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

    // function createPerson(id: string, firstName: string, lastName: string, country: string): Person {
    //     //if ([id, firstName, lastName, country].some(input => input === undefined || input == null)) throw Error('')
    //     if ([id, firstName, lastName, country].some(input => !input)) throw Error('All inputs need a value')
        
    //     return {
    //         id,
    //         firstName,
    //         lastName,
    //         country,
    //     }
    // }


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


    const listener = app.listen(3000, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:`, listener.address());
    });
})();