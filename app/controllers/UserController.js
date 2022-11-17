const UserModel = require('../models/UserModel');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getToken = (params = {}) => {
  return jwt.sign(params, process.env.SECRET, {
    expiresIn: 86400
  });
}

module.exports = class UserController {
  static async register(req, res, next) {
    const { email, password } = req.body;

    try {
      const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(150).required(),
        password: Joi.string().min(3).max(150).required(),
      })
  
      const result = schema.validate(req.body)
      if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message })
      }
      
      if (await UserModel.getUser(email)) {
        return res.status(400).send({ error: 'User already exists' });
      }

      await UserModel.register({
        ...req.body,
        password: await bcrypt.hash(password, 10)
      })

      const user = await UserModel.getUser(email);

      user.password = undefined;

      return res.status(200).json({
        insertedUser: user,
        token: getToken({ id: user._id })
      });
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async auth(req, res, next) {
    const { email, password } = req.body;

    try {
      const schema = Joi.object({
        email: Joi.string().min(3).max(150).required(),
        password: Joi.string().min(3).max(150).required(),
      })
  
      const result = schema.validate(req.body)

      if (result.error) {
        return res.status(400).send({ error: result.error.details[0].message })
      }
      
      const user = await UserModel.getUser(email);
      
      if (!user) {
        return res.status(400).send({ error: 'User not found' })
      }

      if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' })
      }

      user.password = undefined;

      return res.status(200).json({
        user,
        token: getToken({ id: user._id })
      });
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}