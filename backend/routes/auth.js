const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/Users');

const authRouter = Router();

authRouter.get('/', async (req, res) => {
    if (!req.user) {
        const users = await Users.find({}).exec();
        return res.json({
            status: false,
            exists: users.length > 1
        });
    }
    return res.json({
        status: true
    });
});

authRouter.post('/login',
    body('email').isEmail().withMessage("Please enter a valid email address"),
    body('password').isLength({ min: 8 }).withMessage("Email/Password combination is invalid"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const findUser = await Users.findOne({ email }, { email: 1, password: 1, salt: 1 }).exec;
        if (findUser) {
            console.log({ findUser });
        }
        return res.send("");
    }
);

authRouter.post('/register',
    body('email').isEmail().withMessage("Please enter a valid email address"),
    body('name').isLength({ min: 4 }).withMessage("Please enter a name longer than 4 characters."),
    body('password').isLength({ min: 8 }).withMessage("Email/Password combination is invalid"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: "validation",
                errors: errors.array()
            });
        }

        const { email, password, name } = req.body;

        console.log({ email, password, name });

        try {
            const findUser = await Users.findOne({ email }, { email: 1, password: 1, salt: 1 }).exec();
            if (findUser) {
                console.log({ findUser });
                return res.status(400).json({
                    status: false,
                    message: "User with email already exists"
                });
            }

            const newUser = new Users({
                name,
                email
            });

            await newUser.save();
            console.log({ newUser });

            const passHash = bcrypt.hashSync(password, newUser.salt);
            newUser.password = passHash;

            await newUser.save();

            // console.log({ newUser });

            // console.log({ process: process.env });

            const secret = process.env.JWT_SECRET;
            
            const token = jwt.sign({
                name,
                email
            }, secret, { algorithm: 'RS256' });

            return res.status(200).json({
                token,
                status: true
            })
        } catch(e) {
            console.log({ e });
            return res.status(500).json({
                status: false
            });
        }
    }
);

module.exports = authRouter;