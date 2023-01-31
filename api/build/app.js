"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const threadRoutes_1 = __importDefault(require("./routes/threadRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use('/api/messages', messageRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/threads', threadRoutes_1.default);
app.use((req, res, next) => {
    res.status(404).end();
});
// Syncing our database
models_1.db.sync({ alter: true }).then(() => {
    console.info("connected to the database!");
});
app.listen(3000);
