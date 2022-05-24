import { Response, Request } from 'express';
import { resultFail, resultOk } from '../helpers';
import { assets, persons, assetTypes, Asset } from '../dbContext';

function createAsset(id: string, name: string, assetTypeId: string, personId: string | null): Asset {
    if ([name, assetTypeId].some(input => !input)) throw Error('All inputs need a value')
    
    return {
        id,
        assetTypeId,
        name,
        personId,
    }
}

export const index = async (req: Request, res: Response) => {
    try {
        const items = await assets.allItems();
        resultOk(res, items);
    } catch(error) {
        resultFail(res, error);
    }
}

export const postNew = async (req: Request, res: Response) => {
    try {
        const asset = req.body as Asset;
        const { assetTypeId, name, personId = null } = asset;
        const id = Math.random().toString();

        if (personId && ! await persons.hasKey(personId)) {
            throw new Error(`Unknown personId ${personId}`)
        }
        if (! await assetTypes.hasKey(assetTypeId)) {
            throw new Error(`Unknown assetTypeId ${assetTypeId}`)
        }    
    
        const newAsset = await assets.set(id, createAsset(id, assetTypeId, name, personId ));
        resultOk(res, newAsset);
    } catch(error) {
        resultFail(res, error);
    }
}

export const postUpdate = async (req: Request, res: Response) => {
    try {
        const  { params: { id } } = req;
        if (!await assets.hasKey(id)) throw new Error('id not found');
        const asset = req.body as Asset;
        const { assetTypeId, name, personId } = asset;
        
        if (personId && ! await persons.hasKey(personId)) {
            throw new Error(`Unknown personId ${personId}`)
        }
        if (! await assetTypes.hasKey(assetTypeId)) {
            throw new Error(`Unknown assetTypeId ${assetTypeId}`)
        }    
        
        await assets.set(id, createAsset(id, assetTypeId, name, personId ));
        resultOk(res);
    } catch(error) {
        resultFail(res, error);
    }    
}

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const { params: { id } } = req;
        const result = await assets.delete(id);
        resultOk(res, result);
    } catch(error) {
        resultFail(res, error);
    }   
}