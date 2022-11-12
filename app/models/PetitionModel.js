const client = require('../../config/dbConnection');

module.exports = class PetitionModel {
  static async getPetitions() {
    const cursor = await client
    .db('petition')
    .collection('petitions')
    .find();

    const petitions = await cursor.toArray();

    return petitions;
  }

  static async addPetition(data) {
    const petitions = await this.getPetitions();

    try {
      const newPetition = {
        id: petitions[petitions.length - 1].id + 1,
        name: data.name,
        director: data.director,
        link: data.link,
        date: new Date()
      }

      const response = await client
      .db('petition')
      .collection('petitions')
      .insertOne(newPetition);
      
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  static async updatePetition(data, id) {
    try {
      const updatedPetition = {
        name: data.name,
        director: data.director,
        link: data.link,
        date: new Date()
      }

      const update = await client
      .db('petition')
      .collection('petitions')
      .updateOne(
        { id: parseInt(id) },
        { $set: updatedPetition }
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
        { id: parseInt(id) }
      )

      return deletePetition;
    } catch (error) {
      console.error(error);
    }
  }
}