const { Router, response } = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Movies = require('../models/Movies');

const moviesRouter = Router();

moviesRouter.get('/', async (req, res) => {
    // if (!req.user) {
    //     return res.json({
    //         status: false
    //     });
    // }
    const movies = await Movies.find({}).exec();
    return res.json({
        status: true,
        result: movies
    });
});

moviesRouter.get('/:id', async (req, res) => {
    if (!req.auth) {
        return res.json({
            status: false
        });
    }
    const { id }  = req.params;
    const movie = await Movies.findOne({ _id: id }, { addedBy: -1 });
    return res.json({
        status: true,
        result: movie
    });
});

moviesRouter.post('/create',
    body("title").isLength({ min: 1 }).withMessage("The title is missing"),
    body("description").isLength({ min: 1 }).withMessage("The description is missing"),
    body("director").isLength({ min: 1 }).withMessage("The director is missing"),
    body("duration").isNumeric().withMessage("The duration is missing"),
    async (req, res) => {
        // if (!req.auth) {
        //     return res.json({
        //         status: false
        //     });
        // }

        try{
            //console.log({ auth: req.auth });
            const addedBy = "";

            const { title, description, director, duration } = req.body;

            const newMovie = new Movies({
                title, director, duration, description, addedBy
            });

            newMovie.save();

            delete newMovie.addedBy

            return res.status(200).json({
                status: true,
                movie: newMovie
            })
        }
        catch(e) {
            return res.status(500).json({
                status: false
            });
        }
    }
);

module.exports = moviesRouter;