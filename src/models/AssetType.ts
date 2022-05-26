import {Model, Column, Table, BelongsToMany, Scopes, PrimaryKey, CreatedAt, UpdatedAt, DataType, HasMany} from "sequelize-typescript";
import { Asset } from "./Asset";

@Scopes(() => ({defaultScope: {include: [Asset] }}))
@Table({tableName: 'assetTypes'})
export class AssetType extends Model<AssetType> {

    @PrimaryKey
    @Column(DataType.STRING)
    id!: string;
  
    @Column(DataType.STRING)
    label!: string;

    @HasMany(() => Asset)
    assets!: Asset[]

  }