"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserThread = exports.ThreadFactory = exports.Thread = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class Thread extends sequelize_1.Model {
}
exports.Thread = Thread;
function ThreadFactory(sequelize) {
    Thread.init({
        threadId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        }
    }, {
        freezeTableName: true,
        tableName: 'threads',
        sequelize
    });
}
exports.ThreadFactory = ThreadFactory;
function AssociateUserThread() {
    Thread.belongsTo(user_1.User, { foreignKey: 'userId' });
}
exports.AssociateUserThread = AssociateUserThread;
