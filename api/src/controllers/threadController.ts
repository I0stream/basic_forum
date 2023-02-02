import { RequestHandler } from "express";
import { Message } from "../models/message";
import { Thread } from "../models/thread";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllThreads: RequestHandler = async (req, res, next) => {
  let threadList = await Thread.findAll();
  res.status(200).json(threadList)
}

export const getThread: RequestHandler = async (req, res, next) => {
  //get thread's messages too?
  let threadId = req.params.threadId;
  let threadFound = await Thread.findByPk(threadId);
  if (threadFound) {
    //get thread messages and append to threadfound?
    
    let ThreadMessages = await Message.findAll({
        where:{ threadId: threadId }
    });

    if (ThreadMessages){//both found
        res.status(200).json({"thread": threadFound, "messages": ThreadMessages});
    }else if (!ThreadMessages) {//just thread found
        res.status(200).json({"thread": threadFound})
    }
    } 
    else  {//nothing found
        res.status(404).json({});
    }
}

export const createThread: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }
    
    let newThread: Thread = req.body;
    newThread.userId = user.userId;
    
    if (newThread.title) {
        let created = await Thread.create(newThread);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

//this updates whole thread
export const updateThread: RequestHandler = async (req, res, next) => {
  let threadId = req.params.threadId;
    let newThread: Thread = req.body;
    
    let threadFound = await Thread.findByPk(threadId);
    
    if (threadFound && threadFound.threadId == newThread.threadId) {
            await Thread.update(newThread, {
                where: { threadId: threadId }
            });
            res.status(200).json();
    }
    else {
        res.status(400).json();
    }
}


export const deleteThread: RequestHandler = async (req, res, next) => {
  let threadId = req.params.threadId;
    let threadfound = await Thread.findByPk(threadId);
    
    if (threadfound) {
        await Thread.destroy({
                where: { threadId: threadId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}

