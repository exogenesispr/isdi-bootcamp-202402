import express from 'express'
import logic from './logic/index.ts'

import fs from 'fs'

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

        logic.registerUser(name, birthdate, email, username, password, (error) => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(201).send()
        })

    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

// login user -> POST /users/auth

api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { username, password } = req.body

        logic.loginUser(username, password, (error, userId) => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(200).json(userId)
        })

    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

// retrieve user -> GET /user/:userId

api.get('/users/:userId', (req, res) => {
    try {
        const userId = req.params.userId
        logic.retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(200).json(user)
        })
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

// retrieve users -> /users/ CANT DO INTERFERENCE WITH SESSIONSTORAGE

api.get('/users', (req, res) => {
    try {
        logic.retrieveUsersWithStatus((error, json) => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            const users = JSON.parse(json)

            // @ts-ignore
            const user = users.find((user) => user.id === req.params.userId)

            if (user) {
                res.json(user)
            } else {
                res.status(404).json(null)
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

// retrieve posts -> GET /posts WITH FS!!

api.get('/posts', (req, res) => {
    try {
        const { authorization: userId } = req.headers
        logic.retrievePosts(userId, (error, posts) => {
            if (error) {
                res.status(200).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(posts)
        })
    } catch (error) {
        res.status(200).json({ error: error.constructor.name, message: error.message })
    }
})

// create post -> POST /posts

api.post('/posts', jsonBodyParser, (req, res) => {
    try {
        const { image, text } = req.body

        logic.createPost(image, text, (error) => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(201).send()
        })

    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

// delete post -> DELETE /posts

api.delete('/posts', jsonBodyParser, (req, res) => {

})

api.listen(8080, () => console.log('API listening on port 8080'))