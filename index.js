const app = require('./config/server');
const routes = require('./app/routes/routes');
require('./startup/prod')(app)

routes.getPetitions(app);
routes.addPetition(app);
routes.updatePetition(app);
routes.deletePetition(app);