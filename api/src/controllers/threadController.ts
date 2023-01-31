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
  let threadFound = await Message.findByPk(threadId);
  if (threadFound) {
      res.status(200).json(threadFound);
  }
  else {
      res.status(404).json({});
  }
}

export const createThread: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }
    
    let newMessage: Message = req.body;
    newMessage.userId = user.userId;
    
    if (newMessage.message) {
        let created = await Message.create(newMessage);
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
    let messageFound = await Message.findByPk(threadId);
    
    if (messageFound) {
        await Message.destroy({
                where: { threadId: threadId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}

