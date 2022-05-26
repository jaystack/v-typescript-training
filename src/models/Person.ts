import {Model, Column, Table, BelongsToMany, Scopes, PrimaryKey, CreatedAt, UpdatedAt, DataType} from "sequelize-typescript";

@Table
export class Person extends Model<Person> {

    @PrimaryKey
    @Column(DataType.STRING)
    id!: string;
  
    @Column(DataType.STRING)
    firstName!: string;

    @Column(DataType.STRING)
    lastName!: string;

    @Column(DataType.STRING)
    country!: string;

  }