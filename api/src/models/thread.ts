import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";
import { Message } from "./message";


export class Thread extends Model<InferAttributes<Thread>, InferCreationAttributes<Thread>>{
    declare threadId: number;
    declare title: string;
    declare description: string;
    declare userId: number;
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
        tableName: 'threads',
        sequelize
    });
}
export function AssociateUserThread() {
    Thread.belongsTo(User, { foreignKey: 'userId' });
}