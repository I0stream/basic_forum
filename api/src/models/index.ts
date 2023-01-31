import exp from "constants";
import { Sequelize } from "sequelize";
import { MessageFactory } from "./message";
import { UserFactory } from "./user";
import { ThreadFactory } from "./thread";

const dbName = 'networkdb';
const username = 'root';
const password = 'Password1!';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

UserFactory(sequelize)
MessageFactory(sequelize)
ThreadFactory(sequelize)

export const db = sequelize;