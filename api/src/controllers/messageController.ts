import { RequestHandler } from "express";
import { Message } from "../models/message";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";
import { Thread } from "../models/thread";

export const getAllMessages: RequestHandler = async (req, res, next) => {
  let messageList = await Message.findAll();
    res.status(200).json(messageList);
}


/*
//add to thread too

async function addPostToThread (threadId, messageId){ 
    
    let threadFound = await Thread.findByPk(threadId);
    
    threadFound?.messageIds.push(messageId)

    if (threadFound && threadFound.threadId == threadId) {
            await Thread.update(threadFound, {
                where: { threadId: threadId }
            });
            res.status(200).json();
    }
    else {
        res.status(400).json();
    }
}*/

export const createMessage: RequestHandler = async (req, res, next) => {
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

export const getMessage: RequestHandler = async (req, res, next) => {
  let messageId = req.params.messageId;
  let messageFound = await Message.findByPk(messageId);
  if (messageFound) {
      res.status(200).json(messageFound);
  }
  else {
      res.status(404).json({});
  }
}

export const updateMessage: RequestHandler = async (req, res, next) => {
  let messageId = req.params.messageId;
  let newMessage: Message = req.body;
  
  let messageFound = await Message.findByPk(messageId);
  
  if (messageFound && messageFound.messageId == newMessage.messageId
      && newMessage.message) {
          await Message.update(newMessage, {
              where: { messageId: messageId }
          });
          res.status(200).json();
  }
  else {
      res.status(400).json();
  }
}

export const deleteMessage: RequestHandler = async (req, res, next) => {
  let messageId = req.params.messageId;
  let messageFound = await Message.findByPk(messageId);
  
  if (messageFound) {
      await Message.destroy({
              where: { messageId: messageId }
      });
      res.status(200).json();
  }
  else {
      res.status(404).json();
  }
}