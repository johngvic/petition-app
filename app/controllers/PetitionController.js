const PetitionModel = require('../models/PetitionModel');
const Joi = require('joi');

module.exports = class PetitionController {
  static async getPetitions(req, res, next) {
    try {
      const petitions = await PetitionModel.getPetitions();

      res.status(200).json(petitions);
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async getPetitionById(req, res, next) {
    try {
      const id = req.params.id;
      if (id.length !== 24) res.status(400).json('Invalid argument for ID')
      
      const petition = await PetitionModel.getPetitionById(id);
      if (!petition) res.status(404).json('Petition not found')

      res.status(200).json(petition);
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async addPetition(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().min(3).max(50).required(),
      description: Joi.string().min(3).max(150).required(),
    })

    const result = schema.validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const petition = {
      user: 'any',
      title: req.body.title,
      description: req.body.description,
      signatures: [],
      createdAt: new Date()
    }

    try {
      const response = await PetitionModel.addPetition(petition)

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async updatePetition(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().min(3).max(50),
      description: Joi.string().min(3).max(150),
    })

    const result = schema.validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    try {
      const id = req.params.id;
      if (id.length !== 24) res.status(400).json('Invalid argument for ID');

      const oldPetition = await PetitionModel.getPetitionById(id);
      if (!oldPetition) res.status(404).json('Petition not found');

      const petition = {
        title: req.body.title ? req.body.title : oldPetition.title,
        description: req.body.description ? req.body.description : oldPetition.description,
        signatures: oldPetition.signatures,
        createdAt: oldPetition.createdAt
      }

      const response = await PetitionModel.updatePetition(petition, id)

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async deletePetition(req, res, next) {
    try {
      const id = req.params.id;
      const response = await PetitionModel.deletePetition(id)

      if (id.length !== 24) res.status(400).json('Invalid argument for ID')
      if (response.deletedCount === 0) res.status(404).json('Petition not found')

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}