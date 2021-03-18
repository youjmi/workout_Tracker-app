const path = require("path")

module.exports = (app) => {

  //main index page. 
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
  );
  //exercise page to input data.
  app.get('/exercise', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
  );
  //stats page to show all current data.
  app.get('/stats', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/stats.html'))
  );

}
