import { RequestHandler } from "express";
import { User } from "../models/user";
import { hashPassword, comparePasswords, signUserToken, verifyUser } from "../services/auth";


export const createUser: RequestHandler = async (req, res, next) => {
  let newUser: User = req.body;
  if (newUser.username && newUser.password) {
      let hashedPassword = await hashPassword(newUser.password);
      newUser.password = hashedPassword;
      let created = await User.create(newUser);
      res.status(201).json({
          username: created.username,
          userId: created.userId
      });
  }
  else {
      res.status(400).send('Username and password required');
  }
}
export const loginUser: RequestHandler = async (req, res, next) => {
  // Look up user by their username
  let existingUser: User | null = await User.findOne({ 
      where: { username: req.body.username }
  });

  // If user exists, check that password matches
  if (existingUser) {
      let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);
      
      // If passwords match, create a JWT
      if (passwordsMatch) {
          let token = await signUserToken(existingUser);
          res.status(200).json({ "token": token, "userId": existingUser.userId });
      }
      else {
          res.status(401).json('Invalid password');
      }
  }
  else {
      res.status(401).json('Invalid username');
  }
}

export const getUser: RequestHandler = async (req, res, next) => {

    req.headers.authorization = `Bearer ${req.body.token}`
      let user: User | null = await verifyUser(req);

  if (user) {
      let { username, email, userId } = user;
      res.status(200).json({
          username,
          email,
          userId
      });
  }
  else {
      res.status(401).send();
  }
}