import dotenv from 'dotenv'

import mongoose from 'mongoose'

import { Community, CommunityType, User, UserType } from '../data/index.ts'

const { Types: { ObjectId } } = mongoose

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { NotFoundError } = errors

dotenv.config()

describe('getProviderById', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieve a user by its Id', () => {
        return Community.deleteMany()
            .then(() => User.deleteMany())
            .then(() => Community.create({
                name: 'Nova',
                dcReference: 'dcLinkNova',
                price: {
                    m10: {
                        value: 100000,
                        lastEdited: Date.now()
                    },
                    raidVip: {
                        value: 1500000,
                        lastEdited: Date.now()
                    },
                    raidUnsaved: {
                        value: 500000,
                        lastEdited: Date.now()
                    },
                    raidSaved: {
                        value: 200000,
                        lastEdited: Date.now()
                    }
                }
            })
                .then(() => Community.create({
                    name: 'Oblivion',
                    dcReference: 'dcLinkOblivion',
                    price: {
                        m10: {
                            value: 120000,
                            lastEdited: Date.now()
                        },
                        raidVip: {
                            value: 1450000,
                            lastEdited: Date.now()
                        },
                        raidUnsaved: {
                            value: 500000,
                            lastEdited: Date.now()
                        },
                        raidSaved: {
                            value: 220000,
                            lastEdited: Date.now()
                        }
                    }
                })
                    .then(() => Community.create({
                        name: 'Dawn',
                        dcReference: 'dcLinkDawn',
                        price: {
                            m10: {
                                value: 125000,
                                lastEdited: Date.now()
                            },
                            raidVip: {
                                value: 1600000,
                                lastEdited: Date.now()
                            },
                            raidUnsaved: {
                                value: 550000,
                                lastEdited: Date.now()
                            },
                            raidSaved: {
                                value: 190000,
                                lastEdited: Date.now()
                            }
                        }
                    })
                        .then(() => Community.create({
                            name: 'Sylvanas',
                            dcReference: 'dcLinkSylvanas',
                            price: {
                                m10: {
                                    value: 100000,
                                    lastEdited: Date.now()
                                },
                                raidVip: {
                                    value: 1450000,
                                    lastEdited: Date.now()
                                },
                                raidUnsaved: {
                                    value: 500000,
                                    lastEdited: Date.now()
                                },
                                raidSaved: {
                                    value: 200000,
                                    lastEdited: Date.now()
                                }
                            }
                        })
                            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'], online: false, price: { m10: { value: 100000, lastEdited: new Date } } }))
                            .then((user) => logic.getProviderById(user.id))
                            .then((provider) => {
                                expect(provider).to.exist
                                if ('username' in provider) {
                                    expect(provider.username).to.equal('username')
                                    expect(provider.dcName).to.equal('usernameDC')
                                    expect(provider.password).to.be.undefined
                                    expect(provider.language).to.deep.equal(['EN', 'ES'])
                                    expect(provider.price.m10.value).to.equal(100000)
                                    expect(provider.price.m10.lastEdited).to.be.instanceOf(Date)
                                }
                            })
                        )
                    )
                )
            )
    })

    it('retrieves a Community as a provider by its Id', () => {
        return Community.deleteMany()
            .then(() => User.deleteMany())
            .then(() => Community.create({
                name: 'Nova',
                dcReference: 'dcLinkNova',
                price: {
                    m10: {
                        value: 100000,
                        lastEdited: Date.now()
                    },
                    raidVip: {
                        value: 1500000,
                        lastEdited: Date.now()
                    },
                    raidUnsaved: {
                        value: 500000,
                        lastEdited: Date.now()
                    },
                    raidSaved: {
                        value: 200000,
                        lastEdited: Date.now()
                    }
                }
            })
                .then(() => Community.create({
                    name: 'Oblivion',
                    dcReference: 'dcLinkOblivion',
                    price: {
                        m10: {
                            value: 120000,
                            lastEdited: Date.now()
                        },
                        raidVip: {
                            value: 1450000,
                            lastEdited: Date.now()
                        },
                        raidUnsaved: {
                            value: 500000,
                            lastEdited: Date.now()
                        },
                        raidSaved: {
                            value: 220000,
                            lastEdited: Date.now()
                        }
                    }
                })
                    .then(() => Community.create({
                        name: 'Dawn',
                        dcReference: 'dcLinkDawn',
                        price: {
                            m10: {
                                value: 125000,
                                lastEdited: Date.now()
                            },
                            raidVip: {
                                value: 1600000,
                                lastEdited: Date.now()
                            },
                            raidUnsaved: {
                                value: 550000,
                                lastEdited: Date.now()
                            },
                            raidSaved: {
                                value: 190000,
                                lastEdited: Date.now()
                            }
                        }
                    })
                        .then((dawn) => Community.create({
                            name: 'Sylvanas',
                            dcReference: 'dcLinkSylvanas',
                            price: {
                                m10: {
                                    value: 100000,
                                    lastEdited: Date.now()
                                },
                                raidVip: {
                                    value: 1450000,
                                    lastEdited: Date.now()
                                },
                                raidUnsaved: {
                                    value: 500000,
                                    lastEdited: Date.now()
                                },
                                raidSaved: {
                                    value: 200000,
                                    lastEdited: Date.now()
                                }
                            }
                        })
                            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'], online: false, price: { m10: { value: 100000, lastEdited: new Date } } }))
                            .then(() => logic.getProviderById(dawn.id))
                            .then((provider) => {
                                expect(provider).to.exist

                                if ('name' in provider) {
                                    expect(provider.name).to.equal('Dawn')
                                    expect(provider.dcReference).to.equal('dcLinkDawn')
                                    expect(provider.price.m10.value).to.equal(125000)
                                    expect(provider.price.m10.lastEdited).to.be.instanceOf(Date)
                                }

                            })
                        )
                    )
                )
            )
    })
    it('fails on retrieve a provider by Id', () => {
        return Community.deleteMany()
            .then(() => User.deleteMany())
            .then(() => Community.create({
                name: 'Nova',
                dcReference: 'dcLinkNova',
                price: {
                    m10: {
                        value: 100000,
                        lastEdited: Date.now()
                    },
                    raidVip: {
                        value: 1500000,
                        lastEdited: Date.now()
                    },
                    raidUnsaved: {
                        value: 500000,
                        lastEdited: Date.now()
                    },
                    raidSaved: {
                        value: 200000,
                        lastEdited: Date.now()
                    }
                }
            })
                .then(() => Community.create({
                    name: 'Oblivion',
                    dcReference: 'dcLinkOblivion',
                    price: {
                        m10: {
                            value: 120000,
                            lastEdited: Date.now()
                        },
                        raidVip: {
                            value: 1450000,
                            lastEdited: Date.now()
                        },
                        raidUnsaved: {
                            value: 500000,
                            lastEdited: Date.now()
                        },
                        raidSaved: {
                            value: 220000,
                            lastEdited: Date.now()
                        }
                    }
                })
                    .then(() => Community.create({
                        name: 'Dawn',
                        dcReference: 'dcLinkDawn',
                        price: {
                            m10: {
                                value: 125000,
                                lastEdited: Date.now()
                            },
                            raidVip: {
                                value: 1600000,
                                lastEdited: Date.now()
                            },
                            raidUnsaved: {
                                value: 550000,
                                lastEdited: Date.now()
                            },
                            raidSaved: {
                                value: 190000,
                                lastEdited: Date.now()
                            }
                        }
                    })
                        .then(() => Community.create({
                            name: 'Sylvanas',
                            dcReference: 'dcLinkSylvanas',
                            price: {
                                m10: {
                                    value: 100000,
                                    lastEdited: Date.now()
                                },
                                raidVip: {
                                    value: 1450000,
                                    lastEdited: Date.now()
                                },
                                raidUnsaved: {
                                    value: 500000,
                                    lastEdited: Date.now()
                                },
                                raidSaved: {
                                    value: 200000,
                                    lastEdited: Date.now()
                                }
                            }
                        })
                            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'], online: false, price: { m10: { value: 100000, lastEdited: new Date } } }))
                            .then(() => logic.getProviderById(new ObjectId().toString()))
                            .catch((error) => {
                                expect(error).to.be.instanceOf(NotFoundError)
                                expect(error.message).to.equal('Provider not found')
                            })
                        )
                    )
                )
            )
    })

    after(() => mongoose.disconnect())
})