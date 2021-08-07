const { Router, response } = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Movies = require('../models/Movies');
const Slots = require('../models/Slots');

const slotsRouter = Router();

slotsRouter.get('/', async (req, res) => {
    // if (!req.user) {
    //     return res.json({
    //         status: false
    //     });
    // }
    const slots = await Slots.find({}).exec();
    return res.json({
        status: true,
        result: slots
    });
});

slotsRouter.get('/:id', async (req, res) => {
    if (!req.auth) {
        return res.json({
            status: false
        });
    }
    const { id }  = req.params;
    const slot = await Slots.findOne({ _id: id }, { addedBy: -1 });
    return res.json({
        status: true,
        result: slot
    });
});

slotsRouter.post('/create',
    body("starttime").isNumeric().withMessage("The starttime is missing"),
    body("price").isNumeric().withMessage("The price is missing"),
    body("movieId").isLength({ min: 1 }).withMessage("The movieId is missing"),
    body("totaltickets").isNumeric().withMessage("The totaltickets is missing"),
    async (req, res) => {
        // if (!req.auth) {
        //     return res.json({
        //         status: false
        //     });
        // }

        try{
            // console.log({ auth: req.auth });
            const addedBy = "";

            const { starttime, price, movieId, totaltickets } = req.body;

            const found = await Movies.findOne({ _id : movieId }).exec();

            const duration = found.duration;
            const clashes = await Slots.find({}).exec()
            var clash = clashes.reduce((curr, next) => {
                if(curr) return curr;
                if(
                    next.starttime < ((starttime + found.duration) % 2400) 
                    && ((next.startime + next.duration) % 2400) > found.starttime
                ) return true;
            }, false);

            if(clash)
            return res.json({
                status: false
            });


            const newSlot = new Slots({
                starttime, price, addedBy,
                movie: found, 
                tickets: {
                    left: totaltickets,
                    booked: 0
                },
            });

            newSlot.save();

            return res.status(200).json({
                status: true,
                slot: newSlot
            })
        }
        catch(e) {
            return res.status(500).json({
                status: false
            });
        }
    }
);

slotsRouter.post('/buy',
    body("id").isLength({ min: 1 }).withMessage("The id is missing"),
    async (req, res) => {
        // if (!req.auth) {
        //     return res.json({
        //         status: false
        //     });
        // }

        try{
            // console.log({ auth: req.auth });
            const addedBy = "";

            const { id } = req.body;

            const slot = await Slots.findOne({ _id: id }).exec();

            if(!slot || slot.tickets.left <= 0)
            return res.status(404).json({
                status: false
            });

            await Slots.updateOne({ _id : id }, {
                $set: {
                    tickets: {
                        left: slot.tickets.left - 1,
                        booked: slot.tickets.booked + 1
                    }
                }
            })

            return res.status(200).json({
                status: true
            })
        }
        catch(e) {
            return res.status(500).json({
                status: false
            });
        }
    }
);

module.exports = slotsRouter;