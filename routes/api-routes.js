const Workout = require("../models/workout");

module.exports =(app) => {

    app.get("/api/workouts", (req,res) =>{
        console.log("testing GET method here")
        Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    });

    app.post("/api/workouts",(req,res)=>{
        console.log("testing POST Method here")
        Workout.create({exercises: [req.body]})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    });
    
    app.put("/api/workouts/:id",(req,res)=>{
        console.log("testing PUT Method here")
        Workout.findOneAndUpdate({_id:req.params.id}, {$push: {exercises:[req.body]}},{new:true})
    })

    app.get("/api/workouts/range",(req,res) => {
        Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(err)
        })
    })
}


