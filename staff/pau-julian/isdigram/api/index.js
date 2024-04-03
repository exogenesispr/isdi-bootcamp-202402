import express from 'express'
import logic from './logic/index.mjs'
import fs from 'fs'

const api = express()

const jsonBodyParser = express.json()

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

            res.status(202).send({ userId })
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
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(200).send(user)
        })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
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


// retrieve posts -> GET /posts

api.get('/posts', (req, res) => {
    fs.readFile('./data/posts.json', 'utf-8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        const posts = JSON.parse(json)

        res.status(200).send(posts)
    })
})

api.listen(8080, () => console.log('API listening on port 8080'))