import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import morgan from 'morgan'
import logic from './logic/index.ts'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { errors } from 'com'

const { SystemError, ContentError, NotFoundError, CredentialsError, UnauthorizedError } = errors

dotenv.config()

const { TokenExpiredError } = jwt

const { MONGODB_URL, PORT, JWT_SECRET, JWT_EXP } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = express.json()

        api.use(morgan('dev'))

        api.use(cors())

        // Register

        api.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { username, password, dcName, language } = req.body

                logic.registerUser(username, password, dcName, language)
                    .then(() => res.status(201).send())
                    .catch((error) => {
                        res.status(500).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        // Login

        api.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body

                logic.authenticateUser(username, password)
                    .then((userId) => {
                        const token = jwt.sign({ sub: userId }, JWT_SECRET)

                        res.json(token)
                    })
                    .catch((error) => {
                        if (error instanceof SystemError) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        api.get('/users/:targetUserId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveUser(userId as string, targetUserId)
                    .then((user) => res.json(user))
                    .catch((error) => {
                        if (error instanceof NotFoundError) {
                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        } else {
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        // Retrieve Users (with online status)

        api.get('/users/status/:online', (req, res) => {
            try {
                logic.retrieveUsersByStatus()
                    .then((users) => res.json(users))
                    .catch((error) => {
                        if (error instanceof SystemError) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        // Retrieve Communities

        api.get('/communities', (req, res) => {
            try {
                logic.retrieveCommunities()
                    .then((communities) => res.json(communities))
                    .catch((error) => {
                        if (error instanceof ContentError) {
                            res.status(406).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof SystemError) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        //...

        api.listen(PORT, () => console.info(`API listening on port ${PORT}`))
    })
    .catch(console.error)