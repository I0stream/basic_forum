import exp from "constants";
import { Sequelize } from "sequelize";
import { AssociateUserMessage, MessageFactory } from "./message";
import { UserFactory } from "./user";
import { ThreadFactory, AssociateUserThread } from "./thread";

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
AssociateUserThread()
AssociateUserMessage()


export const db = sequelize;