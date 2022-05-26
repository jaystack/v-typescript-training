import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'assets',
  username: 'postgres',
  password: 'mysecretpassword',
  storage: 'localhost',
  models: [__dirname + '/models']
}); 