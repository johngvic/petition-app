const Petition = require("../controllers/PetitionController");

module.exports = {
  getPetitions: (app) => {
    app.get('/api/petitions', Petition.getPetitions);
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
