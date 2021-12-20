const db = require('../../database/models');

module.exports = {
    getAllActors: (req, res) => {
        db.Actor.findAll({ include: [{ association: "movies" }] })
            .then(actors => res.status(200).json(actors))
    },
    getOneActor: (req, res) => {
        db.Actor.findOne({ where: { id: req.params.id }, include: [{ association: "movies" }] })
        .then(actor => res.status(200).json(actor))
    },
    create: (req, res) => { 
        const {first_name, last_name, rating, favorite_movie_id} = req.body
        db.Actor.create({first_name, last_name, rating, favorite_movie_id})
        .then(actor => res.status(201).json(actor))
    },
    update: (req, res) => {
        const {first_name, last_name, rating, favorite_movie_id} = req.body
        db.Actor.update({
            first_name,
            last_name, 
            rating, 
            favorite_movie_id
        },{
            where: {
                id : req.params.id
            }
        })
        .then(() => res.status(201).json({ msg: "Updated successfully" }))
        .catch(error => res.status(400).send(error))
    },
    delete: (req, res) => {
        db.actor_movie
        .destroy({
            where: {
            actor_id: req.params.id,
            },
        })
        .then(
            db.Actor.destroy({
            where: {
                id: req.params.id,
            },
            })
            .then(() => {
                return res.status(201).json({
                msg: "Actor eliminado",
                });
            })
            .catch((err) => res.status(400).send(err))
        );
    },
}