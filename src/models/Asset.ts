import {Model, Column, Table, BelongsTo,ForeignKey, HasOne, BelongsToMany, Scopes, PrimaryKey, CreatedAt, UpdatedAt, DataType, AutoIncrement, AllowNull} from "sequelize-typescript";
import {AssetType} from './AssetType'
import { Person } from "./Person";

@Scopes(() => ({defaultScope: {include: [] },
                full: {include: [AssetType, Person]}}))
@Table({tableName:'assets'})
export class Asset extends Model<Asset> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @Column(DataType.STRING)
    name!: string;

    @ForeignKey(() => AssetType)
    @AllowNull(false)
    @Column(DataType.STRING)
    assetTypeId!: string;

    @BelongsTo(()=>AssetType)
    assetType!:AssetType

    @ForeignKey(() => Person)
    @AllowNull(false)
    @Column(DataType.STRING)
    personId!: string;

    @BelongsTo(()=>Person)
    person!:Person
  }