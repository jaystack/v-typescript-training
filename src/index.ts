import express from 'express';

const app  = express();
const port = 3000;

type AssetType = {
    id: string;
    label: string;
}

let assetTypes: AssetType[] = [
    { id: 'mac', label: 'Apple Mac' },
    { id: 'pc', label: 'Windows PC' },
    { id: 'iphone', label: 'Apple Phone' },
]

app.use(express.json());

app.get('/asset-types', (req, res) => {
    res.json({
        ok: true,
        date: Date.now(),
        result: assetTypes
    });
});

function createAssetType(assetId: string, assetLabel: string): AssetType {
    if (!assetId) throw new Error('invalid assetId');
    if (!assetLabel) throw new Error('invalid assetLabel');
    return {
        id: assetId,
        label: assetLabel,
    }
}

app.post('/asset-types', (req, res) => {
    const payload: AssetType = req.body;
    const id = payload.id;
    const label = payload.label;
    if (assetTypes.find(assetType => assetType.id === id)) {
        throw new Error('id is not unique')
    };
    const newAssetType = createAssetType(id, label);
    assetTypes.push(newAssetType);
    //assetTypes = [...assetTypes, newAssetType];
    res.status(202).send();
})

app.put('/asset-types', (req, res) => {
    const payload: AssetType = req.body;
    const id = payload.id;
    const label = payload.label;

    if (!assetTypes.find(assetType => assetType.id === id)) {
        throw new Error('id not found')
    };
    const updatedAssetType = createAssetType(id, label);
    
    assetTypes = assetTypes.map(assetType => {
        return assetType.id === id ? updatedAssetType : assetType
    })
    return res.status(202).send();
})

app.post('/asset-types/:id', (req, res) => {
    const payload: AssetType = req.body;
    const id = req.params.id;
    const label = payload.label;

    if (!assetTypes.find(assetType => assetType.id === id)) {
        throw new Error('id not found')
    };
    const updatedAssetType = createAssetType(id, label);
    
    assetTypes = assetTypes.map(assetType => {
        return assetType.id === id ? updatedAssetType : assetType
    })
    return res.status(202).send();
})


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});