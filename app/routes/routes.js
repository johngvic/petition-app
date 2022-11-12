const Petition = require("../controllers/PetitionController");

module.exports = {
  getPetition: (app) => {
    app.get('/api/petition', Petition.getPetitions);
  },
  
  addPetition: (app) => {
    app.post('/api/petition', Petition.addPetition);
  },

  updatePetition: (app) => {
    app.put('/api/petition/:id', Petition.updatePetition);
  },

  deletePetition: (app) => {
    app.delete('/api/petition/:id', Petition.deletePetition);
  }
}
