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

    set =  async (key: string, item: T) => this.store.set(key, item) && item

    // returns true if key existed
    delete = async (key: string) => this.store.delete(key)
}

export type AssetType = EntityBase & {
    label: string;
}

export type Person = EntityBase & {
    firstName: string;
    lastName: string;
    country: string;
}

export type Asset = EntityBase & {
    assetTypeId: string;
    name: string;
    personId: string | null;
}

export const assetTypes = new Repository<AssetType>(
    [
        { id: 'mac', label: 'Apple Mac' },
        { id: 'pc', label: 'Windows PC' },
        { id: 'iphone', label: 'Apple Phone' },
    ]
);

export const persons = new Repository<Person>(
    [
        { id: 'z', firstName: 'Peter', lastName: 'Zentai', country: 'UK' },
        { id: 'np', firstName: 'Peter', lastName: 'Nochta', country: 'HU' },
    ]
);

export const assets = new Repository<Asset>([
    { id: 'asset1', name: 'MacBook #123', assetTypeId: 'mac', personId: 'z' },
    { id: 'asset2', name: 'MacBook #124', assetTypeId: 'mac', personId:  null},
])