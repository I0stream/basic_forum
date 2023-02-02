import { RequestHandler } from "express";
import { Message } from "../models/message";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";
import { Thread } from "../models/thread";

export const getAllMessages: RequestHandler = async (req, res, next) => {
  let messageList = await Message.findAll();
    res.status(200).json(messageList);
}


//create new message and associate it with its thread
export const createMessage: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);

  if (!user) {
      return res.status(403).send();
  }
  
  let newMessage: Message = req.body;
  console.log( "blah blah ", newMessage)
  newMessage.message = req.body.message;
  newMessage.userId = user.userId;
  newMessage.threadId = req.body.threadId
  
  if (newMessage.message) {
    let created = await Message.create(newMessage);

    //once the message is created, get thread and add message Id to thread messageids
    
    res.status(200).json(created);
  }
    else {
        res.status(400).json();
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

export const getMessageByThreadId: RequestHandler = async (req, res, next) => {
  let threadId = req.params.threadId;
  let messageFound = await Message.findAll({
    where:{ threadId: threadId }}
    );
  if (messageFound) {
      res.status(200).json(messageFound);
  }
  else {
      res.status(404).json({});
  }
}
export const getMessagesByUserId: RequestHandler = async (req, res, next) => {
  let userId = req.params.userId;
  let messageFound = await Message.findAll({
    where:{ userId: userId }}
    );
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