const Workout = require("../models/workout");

module.exports = (app) => {


    //app.get callback function routing with HTTP GET request to retrieve data
    app.get("/api/workouts", (req, res) => {
        console.log("testing GET method here")
        Workout.aggregate([
            {$limit: 7},
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercise.duration"
                    },
                    // totalDistance: {
                    //     $sum: "$exercise.distance"
                    // },
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

    //app.post sending data to server 
    app.post("/api/workouts", (body, res) => {
        console.log("testing POST Method here")

        Workout.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    });

    //app.put replacing or updating current data of its targeted resource. In this case, ID
    app.put("/api/workouts/:id", (req, res) => {
        Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercise: req.body } }, { new: true },
        )
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
            .catch(err => {
                res.status(err)
            })

    })

    //app.get callback function routing with HTTP GET request to retrieve data
    app.get("/api/workouts/range", (req, res) => {
        Workout.aggregate([{ $limit: 7 },
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


