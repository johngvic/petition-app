const PetitionModel = require('../models/PetitionModel');
const Joi = require('joi');

module.exports = class PetitionController {
  static async getPetitions(req, res, next) {
    try {
      const petitions = await PetitionModel.getPetitions();
      
      if (!petitions) {
        res.status(404).json(`Não existe filme cadastrado.`);
      }

      res.status(200).json(petitions);
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async addPetition(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      director: Joi.string().min(3).max(50).required(),
      link: Joi.string().min(3).max(150).uri().required()
    })

    const result = schema.validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const petition = {
      name: req.body.name,
      director: req.body.director,
      link: req.body.link,
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
      name: Joi.string().min(3).max(50).required(),
      director: Joi.string().min(3).max(50).required(),
      link: Joi.string().min(3).max(150).uri().required()
    })

    const result = schema.validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const id = req.params.id;
    const petition = {
      name: req.body.name,
      director: req.body.director,
      link: req.body.link,
    }

    try {
      const response = await PetitionModel.updatePetition(petition, id)

      if (response.modifiedCount === 0) res.status(400).json('Petition not found')

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async deletePetition(req, res, next) {
    const id = req.params.id;

    try {
      const response = await PetitionModel.deletePetition(id)

      if (response.deletedCount === 0) res.status(400).json('Petition not found')

      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}