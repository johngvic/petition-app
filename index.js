const app = require('./config/server');
const routes = require('./app/routes/routes');
require('./startup/prod')(app)

routes.getPetitions(app);
routes.getPetitionById(app);
routes.addPetition(app);
routes.updatePetition(app);
routes.deletePetition(app);
routes.signPetition(app);
routes.unsignPetition(app);
routes.target(app);

routes.register(app);
routes.auth(app);

module.exports = app