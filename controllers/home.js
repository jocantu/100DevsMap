const Dev = require('../models/Dev')

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
    getDevs: async (req, res) => {
      try {
        const devRegisters = await Dev.find()
        const maxNess = await Dev.find().sort({nessDistance:-1}).limit(1)
        console.log(maxNess)
        const regNo = await Dev.countDocuments()
        console.log(regNo)
        const genderCount = await Dev.aggregate([
            { "$group": {
            "_id": { "$toLower": "$gender" },
            "count": { "$sum": 1 }
        } },
        { "$group": {
            "_id": null, "counts": {"$push": { "k": "$_id", "v": "$count" } }
        } },
        { "$replaceRoot": {
            "newRoot": { "$arrayToObject": "$counts" }
        } }
      ])

      const countDev2 = await Dev.aggregate([
        {$group:
          {
            _id:"$gender",
            count: {$sum:1}
          }
        }
      ])
      const countAge = await Dev.aggregate([
        {$group:
          {
            _id:"$ageGroup",
            count: {$sum:1}
          }
        }
      ])
      console.log(countDev2)
      console.log(genderCount)
      console.log(countAge)
        //console.log(devRegisters)
        res.render('index.ejs', {devs: devRegisters, gender: countDev2, ageGroups: countAge})
      } catch(err){
        console.log(err)
      }
  },

}