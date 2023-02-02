"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteThread = exports.updateThread = exports.createThread = exports.getThread = exports.getAllThreads = void 0;
const message_1 = require("../models/message");
const thread_1 = require("../models/thread");
const auth_1 = require("../services/auth");
const getAllThreads = async (req, res, next) => {
    let threadList = await thread_1.Thread.findAll();
    res.status(200).json(threadList);
};
exports.getAllThreads = getAllThreads;
const getThread = async (req, res, next) => {
    //get thread's messages too?
    let threadId = req.params.threadId;
    let threadFound = await thread_1.Thread.findByPk(threadId);
    if (threadFound) {
        //get thread messages and append to threadfound?
        let ThreadMessages = await message_1.Message.findAll({
            where: { threadId: threadId }
        });
        if (ThreadMessages) { //both found
            res.status(200).json({ "thread": threadFound, "messages": ThreadMessages });
        }
        else if (!ThreadMessages) { //just thread found
            res.status(200).json({ "thread": threadFound });
        }
    }
    else { //nothing found
        res.status(404).json({});
    }
};
exports.getThread = getThread;
const createThread = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newThread = req.body;
    newThread.userId = user.userId;
    if (newThread.title) {
        let created = await thread_1.Thread.create(newThread);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createThread = createThread;
//this updates whole thread
const updateThread = async (req, res, next) => {
    let threadId = req.params.threadId;
    let newThread = req.body;
    let threadFound = await thread_1.Thread.findByPk(threadId);
    if (threadFound && threadFound.threadId == newThread.threadId) {
        await thread_1.Thread.update(newThread, {
            where: { threadId: threadId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.updateThread = updateThread;
const deleteThread = async (req, res, next) => {
    let threadId = req.params.threadId;
    let threadfound = await thread_1.Thread.findByPk(threadId);
    if (threadfound) {
        await thread_1.Thread.destroy({
            where: { threadId: threadId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deleteThread = deleteThread;
