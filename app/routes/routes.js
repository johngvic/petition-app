const Petition = require('../controllers/PetitionController');
const User = require('../controllers/UserController');

module.exports = {
  getPetitions: (app) => {
    app.get('/api/petitions', Petition.getPetitions);
  },

  getPetitionById: (app) => {
    app.get('/api/petitions/:id', Petition.getPetitionById);
  },
  
  addPetition: (app) => {
    app.post('/api/petitions', Petition.addPetition);
  },

  updatePetition: (app) => {
    app.put('/api/petitions/:id', Petition.updatePetition);
  },

  deletePetition: (app) => {
    app.delete('/api/petitions/:id', Petition.deletePetition);
  },

  signPetition: (app) => {
    app.post('/api/petitions/:id/sign', Petition.signPetition);
  },

  unsignPetition: (app) => {
    app.post('/api/petitions/:id/unsign', Petition.unsignPetition);
  },

  register: (app) => {
    app.post('/api/register', User.register);
  },

  auth: (app) => {
    app.post('/api/auth', User.auth);
  }
}
