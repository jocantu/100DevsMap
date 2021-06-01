const Dev = require('../models/Dev')
const Dev2 = require('../models/Dev2')

module.exports = {
  getDevs: async (req, res) => {
    try {
      const devRegisters = await Dev.find()
      res.render('index.ejs', {devs: devRegisters})
    } catch(err){
      console.log(err)
    }
  },
  createDev: async (req, res) => {
    try {
      await Dev.create({
        nickname: req.body.nickname,
        ageGroup: req.body.ageGroup,
        gender: req.body.gender,
        lat: req.body.lat,
        lng: req.body.lng,
        nessDistance: req.body.nessDistance,
      });
      console.log("Dev has been added!");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
  createDev2: async (req, res) => {
    try {
      await Dev2.create({
        location: {
          type: 'Point',
          coordinates: [req.body.lng, req.body.lat],
          properties: {
            nickname: req.body.nickname,
            ageGroup: req.body.ageGroup,
            gender: req.body.gender,
            nessDistance: req.body.nessDistance
          }
        }
      });
      console.log("Dev has been added!");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
}