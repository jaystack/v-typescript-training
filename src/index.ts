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

function createAssetType(id: string, label: string): AssetType {
    if (!id) throw new Error('invalid assetId');
    if (!label) throw new Error('invalid assetLabel');
    return {
        id,
        label,
    }
}

app.post('/asset-types', (req, res) => {
    const payload: AssetType = req.body;
    const { id, label } = payload;
    if (assetTypes.find(assetType => assetType.id === id)) {
        throw new Error('id is not unique')
    };

    assetTypes = [...assetTypes, createAssetType(id, label)];
    res.status(202).send();
})

app.put('/asset-types', (req, res) => {
    const payload: AssetType = req.body;
    const { id, label } = payload;

    if (!assetTypes.find(assetType => assetType.id === id)) {
        throw new Error('id not found')
    };

    assetTypes = assetTypes.map(assetType =>  assetType.id === id ? createAssetType(id, label) : assetType)
    return res.status(202).send();
})

app.post('/asset-types/:id', (req, res) => {
    const payload: AssetType = req.body;
    const id = req.params.id;
    const { label } = payload;

    if (!assetTypes.find(assetType => assetType.id === id)) {
        throw new Error('id not found')
    };

    assetTypes = assetTypes.map(assetType => assetType.id === id ? createAssetType(id, label) : assetType)
    return res.status(202).send();
})


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});