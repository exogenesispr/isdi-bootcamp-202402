//@ts-nocheck

import db from "../data/index.ts"
import logic from "./index.ts"

import { expect } from 'chai'

describe('logic', () => {
    describe('registerUser', () => {
        it('succeds a new user', (done) => {
            db.users.deleteOne((user) => {
                user.username === 'peperoni', (error) => {
                    if (error) {
                        done(error)

                        return
                    }

                    logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', (error) => {
                        if (error) {
                            done(error)

                            return
                        }

                        db.users.findOne((user) => {
                            user.username === 'peperoni', (error, user) => {
                                if (error) {
                                    done(error)

                                    return
                                }
                                expect(!!user).to.be.true
                                expect(user.name).to.equal('Pepe Roni')
                                expect(user.birthdate).to.equal('2000-01-01')
                                expect(user.email).to.equal('pepe@roni.com')
                                expect(user.username).to.equal('peperoni')
                                expect(user.password).to.equal('123qwe123')

                                done()
                            }
                        })
                    })
                }
            })
        })

        it('fails on existing users', (done) => {
            db.users.deleteOne((user) => {
                user.username === 'peperoni', (error) => {
                    if (error) {
                        done(error)

                        return
                    }

                    db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, (error) => {
                        if (error) {
                            done(error)

                            return
                        }

                        logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', (error) => {

                            expect(error).to.be.instanceOf(Error)
                            expect(error.message).to.equal('user already exists')

                            done()
                        })
                    })
                }
            })
        })

        it('fails on non string name', () => {
            let errorThrown

            try {
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
            expect(errorThrown).to.equal('name >< is empty or blank')
        })

        it('fails on non string birthdate', () => {
            let errorThrown

            try {
                logic.registerUser('Pepe Roni', 123, 'pepe@roni.com', 'peperoni', '123qwe123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceof(TypeError)
            expect(errorThrown).to.equal('birthdate 123 is not a string')
        })

        it('fails on incorrect birthdate format', () => {
            let errorThrown

            try {
                logic.registerUser('Pepe Roni', '2000/01/01', 'pepe@roni.com', 'peperoni', '123qwe123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(Error)
            expect(errorThrown).to.equal('birthdate 2000/01/01 does not have a valid format')
        })

        it('fails on non-string email', () => {
            let errorThrown

            try {
                logic.registerUser('Pepe Roni', '2000-01-01', 123, 'peperoni', '123qwe123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceof(TypeError)
            expect(errorThrown).to.equal('email 123 is not a string')
        })

        it('fails on non formatted email', () => {
            let errorThrown

            try {
                logic.registerUser('Pepe Roni', '2000-01-01', 'peperoni.c', 'peperoni', '123qwe123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(TypeError)
            expect(errorThrown).to.equal('email peperoni.c is not an email')
        })

        it('fails on non-string username', () => {
            let errorThrown

            try {
                logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 123, '123qwe123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(TypeError)
            expect(errorThrown).to.equal('username 123 is not a string')
        })

        it('fails on wrong username', () => {
            let errorThrown

            try {
                logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'pepe roni', '123qwe123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(TypeError)
            expect(errorThrown).to.equal('username pepe roni has empty spaces')
        })

        it('fails on wrong username', () => {
            let errorThrown

            try {
                logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123123123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(TypeError)
            expect(errorThrown).to.equal('password 123123123 is not acceptable')
        })

    })

    describe('loginUser', () => {
        it('succeeds on existing user and correct credentials', (done) => {
            db.users.deleteOne((user) => {
                user.username === 'peperoni', (error) => {
                    if (error) {
                        done(error)

                        return
                    }

                    db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, (error, insertedUserId) => {
                        if (error) {
                            done(error)

                            return
                        }

                        logic.loginUser('peperoni', '123qwe123', (error, userId) => {
                            if (error) {
                                done(error)

                                return
                            }

                            expect(userId).to.equal(insertedUserId)

                            db.users.findOne((user) => {
                                user.id === userId, (error, user) => {
                                    if (error) {
                                        done(error)

                                        return
                                    }

                                    expect(user.status).to.equal('online')

                                    done()
                                }
                            })
                        })
                    })
                }
            })
        })

        it('fails on existing user and incorrect password', (done) => {
            db.users.deleteOne((user) => {
                user.username === 'peperoni', (error) => {
                    if (error) {
                        done(error)

                        return
                    }

                    db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, (error) => {
                        if (error) {
                            done(error)

                            return
                        }

                        logic.loginUser('peperoni', '123qwe123qwe', (error, userId) => {
                            expect(error).to.be.instanceOf(Error)
                            expect(error.message).to.equal('wrong password')
                            expect(userId).to.be.undefined

                            done()
                        })
                    })
                }
            })
        })

        it('fails on existing user and incorrect username', (done) => {
            db.users.deleteOne((user) => {
                user.username === 'peperoni', (error) => {
                    if (error) {
                        done(error)

                        return
                    }

                    logic.loginUser('peperoni2', '123qwe123', (error, userId) => {
                        expect(error).to.be.instanceOf(Error)
                        expect(error.message).to.equal('user not found')

                        expect(userId).to.be.undefined

                        done()
                    })
                }
            })
        })
    })

    describe('retrieveUser', () => {
        it('retrieves existing user', (done) => {
            db.users.deleteOne((user) => {
                user.username === 'peperoni', (error) => {
                    if (error) {
                        done(error)

                        return
                    }

                    logic.retrieveUser(insertedUserId, (error, user) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(user.id).to.be.undefined
                        expect(user.username).to.equal('peperoni')
                        expect(user.email).to.equal('pepe@roni.com')
                        expect(user.birthdate).to.equal('2000-01-01')
                        expect(user.password).to.be.undefined
                        expect(user.status).to.be.undefined

                        done()
                    })
                }
            })
        })

        it('does no retrieve a non-existing user', (done) => {
            db.users.deleteOne((user) => user.username === 'peperoni', (error) => {
                if (error) {
                    done(error)

                    return
                }

                db.users.insertOne({ name: 'Pepe roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, (error, insertedUserId) => {
                    if (error) {
                        done(error)

                        return
                    }

                    logic.retrieveUser('wrong-id', (error, user) => {
                        expect(error).to.be.instanceOf(Error)
                        expect(error.message).to.equal('user not found')

                        expect(user).to.be.undefined

                        done()
                    })
                })
            })
        })
    })

    describe('logoutUser', () => {
        it('logs out current session with user', (done) => {
            db.users.deleteOne((user) => {
                user.username === 'peperoni', (error) => {
                    if (error) {
                        done(error)

                        return
                    }

                    db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, (error, insertedUserId) => {
                        if (error) {
                            done(error)

                            return
                        }

                        logic.loginUser('peperoni', '123qwe123', (error, userId) => {
                            if (error) {
                                done(error)

                                return
                            }

                            logic.logoutUser((insertedUserId, error) => {
                                if (error) {
                                    done(error)

                                    return
                                }

                                expect(insertedUserId).to.be.null

                                db.users.findOne((user) => {
                                    user.username === 'peperoni', (error, user) => {
                                        if (error) {
                                            done(error)

                                            return
                                        }

                                        expect(user.status).to.equal('offline')

                                        done()
                                    }
                                })
                            })
                        })
                    })
                }
            })
        })
    })

    //TODO messages (still working with sessionStorage)


    describe('createPost', () => {
        it('creates a post when valid arguments', (done) => {
            logic.createPost
        })
    })

    describe('retrievePosts', () => {
        it('retrieves all posts for existing user', (done) => {
            db.users.deleteAll((error) => {
                if (error) {
                    done(error)

                    return
                }

                db.posts.deleteAll((error) => {
                    if (error) {
                        done(error)

                        return
                    }

                    db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, (error, insertedUserid) => {
                        if (error) {
                            done(error)

                            return
                        }

                        const insertedPosts = []

                        let count = 1

                        const insertedPost1 = { author: insertedUserid, image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date().toLocaleDateString('en-CA') }

                        db.posts.insertOne(insertedPost1, (error, insertedPostId1) => {
                            if (error) {
                                done(error)

                                return
                            }

                            insertedPosts.push(insertedPost1)

                            count++


                            const insertedPost2 = { author: insertedUserId, image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date().toLocaleDateString('en-CA') }

                            db.posts.insertOne(insertedPost2, (error, insertedpostId2) => {
                                if (error) {
                                    done(error)

                                    return
                                }

                                insertedPosts.push(insertedPost2)

                                count++

                                const insertedPost3 = { author: insertedUserId, image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date().toLocaleDateString('en-CA') }

                                db.posts.insertOne(insertedPost3, (error, insertedPostId3) => {
                                    if (error) {
                                        done(error)

                                        return
                                    }

                                    insertedPosts.push(insertedPost3)

                                    logic.retrievePosts(insertedUserId, (error, posts) => {
                                        if (error) {
                                            done(error)

                                            return
                                        }

                                        expect(posts).to.have.lengthOf(3)

                                        const post1 = posts[2]

                                        expect(post1.author.username).to.equal('peperoni')
                                        expect(post1.author.id).to.equal(insertedUserId)
                                        expect(post1.image).to.equal(insertedPost1.image)
                                        expect(post1.text).to.equal(insertedPost1.text)
                                        expect(post1.date).to.equal(insertedPost1.date)

                                        const post2 = posts[1]

                                        expect(post2.author.username).to.equal('peperoni')
                                        expect(post2.author.id).to.equal(insertedUserId)
                                        expect(post2.image).to.equal(insertedPost2.image)
                                        expect(post2.text).to.equal(insertedPost2.text)
                                        expect(post2.date).to.equal(insertedPost2.date)

                                        const post3 = posts[0]

                                        expect(post3.author.username).to.equal('peperoni')
                                        expect(post3.author.id).to.equal(insertedUserId)
                                        expect(post3.image).to.equal(insertedPost3.image)
                                        expect(post3.text).to.equal(insertedPost3.text)
                                        expect(post3.date).to.equal(insertedPost3.date)

                                        done()
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })




})