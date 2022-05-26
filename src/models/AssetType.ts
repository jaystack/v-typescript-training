import {Model, Column, Table, BelongsToMany, Scopes, PrimaryKey, CreatedAt, UpdatedAt, DataType} from "sequelize-typescript";

@Table
export class AssetType extends Model<AssetType> {

    @PrimaryKey
    @Column(DataType.STRING)
    id!: string;
  
    @Column(DataType.STRING)
    label!: string;

  }