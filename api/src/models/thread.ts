import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";
import { Message } from "./message";


export class Thread extends Model<InferAttributes<Thread>, InferCreationAttributes<Thread>>{
    declare threadId: number;// is post number
    declare title: string;
    declare description: string;
    declare userId: number;
    declare messageIds: [number];
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function ThreadFactory(sequelize: Sequelize) {
    Thread.init({
      threadId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
      },
        messageIds: {
          type: DataTypes.ARRAY(DataTypes.INTEGER),
          allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        freezeTableName: true,
        tableName: 'messages',
        sequelize
    });
}
export function AssociateUserThread() {
    User.hasMany(Thread, { foreignKey: 'userId' });
    Thread.hasMany(Message), {foreignKey: 'messageIds'}
    Thread.belongsTo(User, { foreignKey: 'userId' });

}