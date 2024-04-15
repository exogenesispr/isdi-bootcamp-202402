import { MongoClient, ObjectId } from 'mongodb'
import logic from "./index.ts"
import { expect } from 'chai'
import { errors } from 'com'

const { DuplicityError } = errors

describe('registerUser', () => {
    let client, users

    before((done) => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect()
            .then((connection) => {
                const db = connection.db('test')

                users = db.collection('users')

                logic.users = users

                done()
            })
            .catch(done)
    })

    //test

    it('succeds a new user', (done) => {
        users.deleteMany()
            .then(() => {
                logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', (error) => {
                    if (error) {
                        done(error)

                        return
                    }
                    users.findOne({ username: 'peperoni' })
                        .then((user) => {
                            try {
                                expect(!!user).to.be.true
                                expect(user.name).to.equal('Pepe Roni')
                                expect(user.birthdate).to.equal('2000-01-01')
                                expect(user.email).to.equal('pepe@roni.com')
                                expect(user.username).to.equal('peperoni')
                                expect(user.password).to.equal('123qwe123')

                                done()
                            } catch (error) {
                                done(error)
                            }
                        })
                        .catch(done)
                })
            })
            .catch(done)
    })

    it('fails on existing users', (done) => {
        users.deleteMany()
            .then(() => {
                users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                    .then(() => {
                        logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', (error) => {
                            try {
                                expect(error).to.be.instanceOf(DuplicityError)
                                expect(error.message).to.equal('user already exists')

                                done()
                            } catch (error) {
                                done(error)
                            }
                        })
                    })
                    .catch(done)
            })
            .catch(done)
    })

    it('fails on non string name', () => {
        let errorThrown

        try {
            //@ts-ignore
            logic.registerUser(123, '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', () => { })
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('name 123 is not a string')
    })

    it('fails on empty name', () => {
        let errorThrown

        try {
            logic.registerUser('', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', () => { })
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceof(Error)
        expect(errorThrown.message).to.equal('name >< is empty or blank')
    })

    it('fails on non string birthdate', () => {
        let errorThrown

        try {
            //@ts-ignore
            logic.registerUser('Pepe Roni', 123, 'pepe@roni.com', 'peperoni', '123qwe123', () => { })
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceof(TypeError)
        expect(errorThrown.message).to.equal('birthdate 123 is not a string')
    })

    it('fails on incorrect birthdate format', () => {
        let errorThrown

        try {
            logic.registerUser('Pepe Roni', '2000/01/01', 'pepe@roni.com', 'peperoni', '123qwe123', () => { })
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('birthdate 2000/01/01 does not have a valid format')
    })

    it('fails on non-string email', () => {
        let errorThrown

        try {
            //@ts-ignore
            logic.registerUser('Pepe Roni', '2000-01-01', 123, 'peperoni', '123qwe123', () => { })
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceof(Error)
        expect(errorThrown.message).to.equal('email 123 is not an email')
    })

    it('fails on non formatted email', () => {
        let errorThrown

        try {
            logic.registerUser('Pepe Roni', '2000-01-01', 'peperoni.c', 'peperoni', '123qwe123', () => { })
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('email peperoni.c is not an email')
    })

    it('fails on non-string username', () => {
        let errorThrown

        try {
            //@ts-ignore
            logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 123, '123qwe123', () => { })
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('username 123 is not a string')
    })

    it('fails on wrong username', () => {
        let errorThrown

        try {
            logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'pepe roni', '123qwe123', () => { })
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('username pepe roni has empty spaces')
    })

    it('fails on wrong password', () => {
        let errorThrown

        try {
            logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123123123', () => { })
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('password 123123123 is not acceptable')
    })

    after((done) => {
        client.close()
            .then(() => done())
            .catch(done)
    })
})