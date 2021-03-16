const Workout = require("../models/workout");

module.exports =(app) => {

    app.get("/api/workouts", (req,res) =>{
        console.log("testing GET method here")
        Workout.aggregate([
            {
                $limit: 7,
            },
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$excercise.duration",
                    }
                }
            },
        ])


        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    });

    app.post("/api/workouts",(body,res)=>{
        console.log("testing POST Method here")
        Workout.create({body})

        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    });
    
    app.put("/api/workouts/:id",(req,res)=>{
        console.log("testing PUT")
        Workout.findOneAndUpdate({_id:req.params.id}, {$push: {exercise:req.body}},{new:true},)
    })

    app.get("/api/workouts/range",(req,res) => {
        Workout.aggregate ([
            {
                $limit: 7
            },
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercise.duration"
                    }
                }
            },
        ])
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(err)
        })
    })
}


