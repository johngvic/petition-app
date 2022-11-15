const Petition = require("../controllers/PetitionController");

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
  }
}
