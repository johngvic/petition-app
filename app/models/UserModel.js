const client = require('../../config/dbConnection');
const { ObjectId } = require('mongodb');

module.exports = class UserModel {
  static async getUser(email) {
    const user = client
    .db('petition')
    .collection('user')
    .findOne({ email });

    return user;
  }

  static async register(user) {
    const response = client
    .db('petition')
    .collection('user')
    .insertOne(user);

    return response;
  }
}