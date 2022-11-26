const PetitionModel = require('../models/PetitionModel');
const Joi = require('joi');
const auth = require('../../config/auth');
const { ObjectId } = require('mongodb');

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
      if (id.length !== 24) {
        return res.status(400).json({ error: 'Invalid argument for ID' })
      }
      
      const petition = await PetitionModel.getPetitionById(id);
      if (!petition) {
        return res.status(404).json({ error: 'Petition not found' })
      }

      return res.status(200).json(petition);
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async addPetition(req, res, next) {
    const tokenValidation = auth(req, res, next);
    if (tokenValidation) return tokenValidation;

    const userId = req.userId.id;

    const schema = Joi.object({
      title: Joi.string().min(3).max(50).required(),
      description: Joi.string().min(3).max(150).required(),
      target: Joi.number().min(10).max(5000000).required(),
    })

    const result = schema.validate(req.body);
    if (result.error) {
      const error = result.error.details[0].message;
      const missingField = error.split('\"');

      return res.status(400).send({
        error: `Missing property ${missingField[1].toUpperCase()}`
      });
    }

    const petition = {
      ...req.body,
      user: ObjectId(userId),
      signatures: [],
      createdAt: new Date()
    }

    try {
      await PetitionModel.addPetition(petition);

      return res.status(201).json({
        success: 'Petition was successfully added',
        payload: petition
      })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updatePetition(req, res, next) {
    const tokenValidation = auth(req, res, next)
    if (tokenValidation) return tokenValidation;

    const userId = req.userId.id;
    const petitionId = req.params.id;

    const schema = Joi.object({
      title: Joi.string().min(3).max(50),
      description: Joi.string().min(3).max(150),
      target: Joi.number().min(10).max(5000000),
    })

    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).send({ error: result.error.details[0].message });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: 'At least one attribute must be provided' });
    }

    if (petitionId.length !== 24) {
      return res.status(400).json({ error: 'Invalid argument for ID' });
    }

    try {
      const oldPetition = await PetitionModel.getPetitionById(petitionId);
      if (!oldPetition) {
        return res.status(404).json({ error: 'Petition not found' });
      }

      if (oldPetition.user.valueOf() != userId) {
        return res.status(401).json({ error: 'You should be the petition\'s owner to edit it' });
      }

      const petition = {
        title: req.body.title ? req.body.title : oldPetition.title,
        description: req.body.description ? req.body.description : oldPetition.description,
        target: req.body.target ? req.body.target : oldPetition.target,
        signatures: oldPetition.signatures,
        createdAt: oldPetition.createdAt
      }

      await PetitionModel.updatePetition(petition, petitionId);

      return res.status(200).json({
        success: 'Petition was successfully edited',
        payload: petition
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async deletePetition(req, res, next) {
    const tokenValidation = auth(req, res, next)
    if (tokenValidation) return tokenValidation;

    const userId = req.userId.id;
    const petitionId = req.params.id;

    if (petitionId.length !== 24) {
      return res.status(400).json({ error: 'Invalid argument for ID' })
    }

    try { 
      const petition = await PetitionModel.getPetitionById(petitionId);
      
      if (!petition) {
        return res.status(404).json({ error: 'Petition not found' })
      }

      if (petition.user.valueOf() != userId) {
        return res.status(401).json({ error: 'You should be the petition\'s owner to delete it' })
      }
      
      await PetitionModel.deletePetition(petitionId)

      res.status(200).json({ success: 'Petition was successfully deleted' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async signPetition(req, res, next) {
    const tokenValidation = auth(req, res, next)
    if (tokenValidation) return tokenValidation;

    const userId = req.userId.id;
    const petitionId = req.params.id;

    if (petitionId.length !== 24) {
      return res.status(400).json({ error: 'Invalid argument for ID' });
    }

    try {
      const oldPetition = await PetitionModel.getPetitionById(petitionId);
      if (!oldPetition) {
        return res.status(404).json({ error: 'Petition not found' });
      }

      if (oldPetition.user.valueOf() == userId) {
        return res.status(400).json({ error: 'You cannot sign your own petition' });
      }

      let isAlreadySigned = false;
      oldPetition.signatures.forEach((signature) => {
        if (signature == userId) {
          isAlreadySigned = true;
        }
      })

      if (isAlreadySigned) {
        return res.status(400).json({ error: 'You\'ve already signed this petition' });
      }

      const updatedSignatures = [...oldPetition.signatures, userId];

      const petition = {
        signatures: updatedSignatures,
      }

      await PetitionModel.updatePetition(petition, petitionId);

      return res.status(200).json({ success: 'Petition was successfully signed' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async unsignPetition(req, res, next) {
    const tokenValidation = auth(req, res, next)
    if (tokenValidation) return tokenValidation;

    const userId = req.userId.id;
    const petitionId = req.params.id;

    if (petitionId.length !== 24) {
      return res.status(400).json({ error: 'Invalid argument for ID' });
    }

    try {
      const oldPetition = await PetitionModel.getPetitionById(petitionId);
      if (!oldPetition) {
        return res.status(404).json({ error: 'Petition not found' });
      }

      const signatureIndex = oldPetition.signatures.findIndex((signature) => signature == userId);
      if (signatureIndex === -1) {
        return res.status(400).json({ error: 'You haven\'t signed this petition yet' });
      }

      const signaturesFiltered = oldPetition.signatures.filter((signature) => signature != userId);
      const petition = {
        signatures: signaturesFiltered,
      }

      await PetitionModel.updatePetition(petition, petitionId);

      return res.status(200).json({ success: 'Petition was successfully unsigned' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async target(req, res, next) {
    try {
      const id = req.params.id;
      if (id.length !== 24) {
        return res.status(400).json({ error: 'Invalid argument for ID' })
      }
      
      const petition = await PetitionModel.getPetitionById(id);
      if (!petition) {
        return res.status(404).json({ error: 'Petition not found' })
      }

      const totalSignatures = petition.signatures.length;
      const target = petition.target;
      const missingSignatures = target - totalSignatures;

      return res.status(200).json(
        missingSignatures !== 0 ?
        { message: `It lacks ${missingSignatures} signature to this petition beat the goal!` } :
        { message: `This petition have already beaten the goal! :)` }
      );
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}