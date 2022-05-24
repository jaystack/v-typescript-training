import { Response, Request } from 'express';
import { resultFail, resultOk } from '../helpers';
import { assetTypes, AssetType } from '../dbContext';

function createAssetType(id: string, label: string): AssetType {
    if (!id) throw new Error('invalid assetId');
    if (!label) throw new Error('invalid assetLabel');
    
    return {
        id,
        label,
    }
}

export const index = async (req: Request, res: Response) => {
    try {
        const items = await assetTypes.allItems();
        resultOk(res, items)    
    } catch(error) {
        resultFail(res, error);
    }
}

export const postNew  = async (req: Request, res: Response) => {
    try {
        const payload: AssetType = req.body;
        const id = req.params.id;
        const { label } = payload;
    
        if (!await assetTypes.hasKey(id)) throw new Error('id not found');
    
        await assetTypes.set(id, createAssetType(id, label));
        resultOk(res);
    } catch(error) {
        resultFail(res, error);
    }
}

export const postUpdate  = async (req: Request, res: Response) => {
    try {
        const payload: AssetType = req.body;
        const id = req.params.id;
        const { label } = payload;
    
        if (!await assetTypes.hasKey(id)) throw new Error('id not found');
    
        await assetTypes.set(id, createAssetType(id, label));
        resultOk(res);

    } catch(error) {
        resultFail(res, error);
    }
}

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const { params: { id } } = req;
        const result = await assetTypes.delete(id);
        resultOk(res, result);
    } catch(error) {
        resultFail(res, error);
    }
}