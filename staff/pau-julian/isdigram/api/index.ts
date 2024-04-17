import mongoose from 'mongoose'
import express from 'express'
import logic from './logic/index.ts'
import { errors } from 'com'
import tracer from 'tracer'
import colors from 'colors'
import jwt from 'jsonwebtoken'

const logger = tracer.colorConsole({
    filters: {
        debug: colors.green,
        info: colors.blue,
        warn: colors.yellow,
        error: colors.red
    }
})

const { ContentError, SystemError, DuplicityError, NotFoundError, CredentialsError } = errors

mongoose.connect('mongodb://localhost:27017/isdigram')
    .then(() => {
        const api = express()

        const jsonBodyParser = express.json()

        api.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')

            next()
        })

        api.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { name, birthdate, email, username, password } = req.body

                logic.registerUser(name, birthdate, email, username, password)
                    .then(() => res.status(201).send())
                    .catch((error) => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        }
                        else if (error instanceof DuplicityError) {
                            logger.error(error.message)

                            res.status(409).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        // login user -> POST /users/auth

        api.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body

                logic.authenticateUser(username, password)
                    .then((userId) => {
                        const token = jwt.sign({ sub: userId }, 'i killed kenny')

                        res.status(200).json(token)
                    })
                    .catch((error) => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof CredentialsError) {
                            logger.warn(error.message)

                            res.status(401).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        // retrieve user -> GET /user/:userId

        api.get('/users/:targetUserId', (req, res) => {
            try {
                const { authorization } = req.headers

                //Bearer {token}
                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, 'i killed kenny')

                const { targetUserId } = req.params

                logic.retrieveUser(userId as string, targetUserId)
                    .then((user) => res.status(200).json(user))
                    .catch((error) => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        // retrieve users -> /users/ CANT DO INTERFERENCE WITH SESSIONSTORAGE

        api.get('/users', (req, res) => {
            // try {
            //     logic.retrieveUser((error, json) => {
            //         if (error) {
            //             res.status(500).json({ error: error.constructor.name, message: error.message })

            //             return
            //         }

            //         const users = JSON.parse(json)

            //         // @ts-ignore
            //         const user = users.find((user) => user.id === req.params.userId)

            //         if (user) {
            //             res.json(user)
            //         } else {
            //             res.status(404).json(null)
            //         }
            //     })
            // } catch (error) {
            //     res.status(500).json({ error: error.constructor.name, message: error.message })
            // }
        })

        // retrieve posts

        api.get('/posts', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, 'i killed kenny')

                // TODO as PROMISES
                logic.retrievePosts(userId as string)
                    .then((posts) => res.json(posts))
                    .catch((error) => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        // create post -> POST /posts

        api.post('/posts', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, 'i killed kenny')

                const { image, text } = req.body

                logic.createPost(userId as string, image, text)
                    .then(() => res.status(201).send())
                    .catch((error) => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }
        })

        // delete post -> DELETE /posts

        api.delete('/posts/:postId', (req, res) => {
            //     const { authorization: userId } = req.headers

            //     const { postId } = req.params

            //     try {
            //         logic.retrievePosts(userId, (error, json) => {
            //             if (error) {
            //                 res.status(400).json({ error: error.constructor.name, message: error.message })

            //                 return
            //             }

            //             const posts = JSON.parse(json)

            //             const postIndex = posts.findIndex((post) => post.id === postId)

            //             if (postIndex > 0) {
            //                 res.status(404).send()

            //                 return
            //             }

            //             posts.splice(postIndex, 1)

            //             try {
            //                 logic.removePost(userId, postId, (error) => {
            //                     if (error) {
            //                         res.status(500).json({ error: error.constructor.name, message: error.message })

            //                         return
            //                     }

            //                     res.status(204).send()
            //                 })
            //             } catch (error) {
            //                 res.status(500).json({ error: error.constructor.name, message: error.message })
            //             }
            //         })
            //     } catch (error) {
            //         res.status(500).json({ error: error.constructor.name, message: error.message })
            //     }
        })

        api.listen(8080, () => console.log('API listening on port 8080'))
    })
    .catch((error) => console.error(error))
