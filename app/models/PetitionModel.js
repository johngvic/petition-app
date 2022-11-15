const client = require('../../config/dbConnection');
const { ObjectId } = require('mongodb');

module.exports = class PetitionModel {
  static async getPetitions() {
    const cursor = client
    .db('petition')
    .collection('petitions')
    .find();

    const petitions = await cursor.toArray();

    return petitions;
  }

  static async getPetitionById(id) {
    const petition = await client
    .db('petition')
    .collection('petitions')
    .findOne({ _id: ObjectId(id) });

    return petition;
  }

  static async addPetition(data) {
    try {
      const response = await client
      .db('petition')
      .collection('petitions')
      .insertOne(data);
      
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  static async updatePetition(data, id) {
    try {
      const update = await client
      .db('petition')
      .collection('petitions')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: data }
      )
        
      return update;
    } catch (error) {
      console.error(error);
    }
  }

  static async deletePetition(id) {
    try {
      const deletePetition = await client
      .db('petition')
      .collection('petitions')
      .deleteOne(
        { _id: ObjectId(id) }
      )

      return deletePetition;
    } catch (error) {
      console.error(error);
    }
  }
}