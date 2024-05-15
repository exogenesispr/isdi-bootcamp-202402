import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import morgan from 'morgan'
import logic from './logic/index.ts'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { errors } from 'com'
import { error } from 'console'

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

        api.post('/eu/users', jsonBodyParser, (req, res) => {
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

        api.post('/eu/users/auth', jsonBodyParser, (req, res) => {
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

        //retrieve user

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

        api.get('/eu/users/status/online', (req, res) => {
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

        api.get('/eu/communities', (req, res) => {
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

        // modify User

        // api.patch('/users/:userId', jsonBodyParser, (req, res) => {
        //     try {
        //         const { authorization } = req.headers

        //         const token = authorization.slice(7)

        //         let userIdToken

        //         try {
        //             const { sub } = jwt.verify(token, JWT_SECRET)
        //             userIdToken = sub
        //         } catch (error) {
        //             res.status(401).json({ error: error.constructor.name, message: error.message })
        //         }

        //         const { userId: userIdParams } = req.params

        //         if (userIdParams !== userIdToken) {
        //             res.status(403).json({ error: UnauthorizedError.name, message: 'Unauthorized' })
        //         }

        //         const { dcName, language, online, price } = req.body

        //         logic.modifyUser(userIdParams, dcName, language, online, price)
        //             .then(() => res.status(204).send())
        //             .catch((error) => {
        //                 if (error instanceof NotFoundError) {
        //                     res.status(404).json({ error: error.constructor.name, message: error.message })
        //                 } else {
        //                     res.status(500).json({ error: error.constructor.name, message: error.message })
        //                 }
        //             })
        //     } catch (error) {
        //         if (error instanceof TypeError || error instanceof ContentError) {
        //             res.status(406).json({ error: error.constructor.name, message: error.message })
        //         } else {
        //             res.status(500).json({ error: error.constructor.name, message: error.message })
        //         }
        //     }
        // })

        // modify user price value and online status

        api.patch('/users/:userId', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)

                let userIdToken

                try {
                    const { sub } = jwt.verify(token, JWT_SECRET)
                    userIdToken = sub
                } catch (error) {
                    res.status(401).json({ error: error.constructor.name, message: error.message })
                    return
                }

                const { userId: userIdParams } = req.params

                if (userIdParams !== userIdToken) {
                    res.status(403).json({ error: UnauthorizedError.name, message: 'Unauthorized' })
                    return
                }

                const { newPrice, online } = req.body

                logic.modifyUserPrice(userIdParams, newPrice)
                    .then(() => {
                        logic.modifyUserOnlineStatus(userIdParams, online as boolean)
                            .then(() => {
                                res.status(204).send()
                            })
                            .catch((error) => {
                                if (error instanceof NotFoundError) {
                                    res.status(404).json({ error: error.constructor.name, message: error.message })
                                } else {
                                    res.status(500).json({ error: error.constructor.name, message: error.message })
                                }
                            })
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        // delete user

        api.delete('/users/:userId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                let userIdToken

                try {
                    const { sub } = jwt.verify(token, JWT_SECRET)
                    userIdToken = sub
                } catch (error) {
                    res.status(401).json({ error: error.constructor.name, message: error.message })
                }

                const { userId: userIdParams } = req.params

                if (userIdParams !== userIdToken) {
                    res.status(403).json({ error: UnauthorizedError.name, message: 'Unauthorized' })
                }

                logic.deleteUser(userIdToken)
                    .then((deletedUser) => {
                        res.status(202).send(deletedUser)
                    })
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

        //get provider by Id

        api.get('/eu/providers/:providerId', (req, res) => {
            const { providerId } = req.params

            try {
                logic.getProviderById(providerId)
                    .then((provider) => res.json(provider))
                    .catch((error) => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }

            }
        })

        //GET wow token info

        api.get('/eu/wowtoken', (req, res) => {
            try {
                logic.retrieveWowTokenData()
                    .then((wowToken) => res.json(wowToken))
                    .catch((error) => {
                        res.status(400).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })



        //...

        api.listen(PORT, () => console.info(`API listening on port ${PORT}`))
    })
    .catch(console.error)