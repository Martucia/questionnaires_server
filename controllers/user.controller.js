const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректні дані авторизації'
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Користувача не знайдено' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Некоректний пароль' });
        }

        const token = jwt.sign({ userId: user.id },
            process.env.jwtSecret, { expiresIn: '1h' }
        )

        return res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Якась халепа' })
    }
}

const auth = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId });

        const token = jwt.sign({ userId: user._id }, process.env.jwtSecret, { expiresIn: "24h" })

        return res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } catch (e) {
        console.log(e)
        return res.send({ message: "Якась халепа" })
    }
}

const registration = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({ name, email, password: hashedPassword })

        await user.save()

        return res.status(201).json({ message: 'User created' })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Something went wrong, please try again' })
    }
}


module.exports = { login, auth, registration };