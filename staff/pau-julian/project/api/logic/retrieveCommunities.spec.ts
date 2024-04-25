import dotenv from 'dotenv'

import mongoose from 'mongoose'

import { Community, User } from '../data/index.ts'

const { Types: { ObjectId } } = mongoose

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { ContentError, SystemError } = errors

dotenv.config()

describe('retrieveCommunities', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves 4 communities, their prices and last updated', () => {
        return Community.deleteMany()
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
                .then((nova) => Community.create({
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
                    .then((oblivion) => Community.create({
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
                            .then((sylvanas) => logic.retrieveCommunities()
                                .then((communities) => {
                                    expect(communities).to.have.lengthOf(4)

                                    expect(communities[0].name).to.equal('Nova')
                                    expect(communities[0].dcReference).to.equal('dcLinkNova')
                                    expect(communities[0].price.m10.value).to.be.a('number')
                                    expect(communities[0].price.m10.lastEdited).to.be.instanceOf(Date)
                                    expect(communities[0].price.raidVip.value).to.be.a('number')
                                    expect(communities[0].price.raidVip.lastEdited).to.be.instanceOf(Date)
                                    expect(communities[0].price.raidUnsaved.value).to.be.a('number')
                                    expect(communities[0].price.raidUnsaved.lastEdited).to.be.instanceOf(Date)
                                    expect(communities[0].price.raidSaved.value).to.be.a('number')
                                    expect(communities[0].price.raidSaved.lastEdited).to.be.instanceOf(Date)

                                    expect(communities[1].name).to.equal('Oblivion')
                                    expect(communities[1].dcReference).to.equal('dcLinkOblivion')
                                    expect(communities[1].price.m10.value).to.be.a('number')
                                    expect(communities[1].price.m10.lastEdited).to.be.instanceOf(Date)
                                    expect(communities[1].price.raidVip.value).to.be.a('number')
                                    expect(communities[1].price.raidVip.lastEdited).to.be.instanceOf(Date)
                                    expect(communities[1].price.raidUnsaved.value).to.be.a('number')
                                    expect(communities[1].price.raidUnsaved.lastEdited).to.be.instanceOf(Date)
                                    expect(communities[1].price.raidSaved.value).to.be.a('number')
                                    expect(communities[1].price.raidSaved.lastEdited).to.be.instanceOf(Date)

                                    expect(communities[2].name).to.equal('Dawn')
                                    expect(communities[2].dcReference).to.equal('dcLinkDawn')
                                    expect(communities[2].price.m10.value).to.be.a('number')
                                    expect(communities[2].price.m10.lastEdited).to.be.instanceOf(Date)
                                    expect(communities[2].price.raidVip.value).to.be.a('number')
                                    expect(communities[2].price.raidVip.lastEdited).to.be.instanceOf(Date)
                                    expect(communities[2].price.raidUnsaved.value).to.be.a('number')
                                    expect(communities[2].price.raidUnsaved.lastEdited).to.be.instanceOf(Date)
                                    expect(communities[2].price.raidSaved.value).to.be.a('number')
                                    expect(communities[2].price.raidSaved.lastEdited).to.be.instanceOf(Date)

                                    expect(communities[3].name).to.equal('Sylvanas')
                                    expect(communities[3].dcReference).to.equal('dcLinkSylvanas')
                                    expect(communities[3].price.m10.value).to.be.a('number')
                                    expect(communities[3].price.m10.lastEdited).to.be.instanceOf(Date)
                                    expect(communities[3].price.raidVip.value).to.be.a('number')
                                    expect(communities[3].price.raidVip.lastEdited).to.be.instanceOf(Date)
                                    expect(communities[3].price.raidUnsaved.value).to.be.a('number')
                                    expect(communities[3].price.raidUnsaved.lastEdited).to.be.instanceOf(Date)
                                    expect(communities[3].price.raidSaved.value).to.be.a('number')
                                    expect(communities[3].price.raidSaved.lastEdited).to.be.instanceOf(Date)
                                }))
                        )
                    )
                )
            )
    })

    it('fails on retrieve 3 of 4 communities', () => {
        return Community.deleteMany()
            .then(() => Community.create({
                name: 'Nova', dcReference: 'dcLinkNova', price: {
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
                .then((nova) => Community.create({
                    name: 'Sylvanas',
                    dcReference: 'dcLinkSylvanas',
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
                    .then((sylvanas) => Community.create({
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
                        .then((dawn) => logic.retrieveCommunities()
                            .catch((error) => {
                                expect(error).to.be.instanceOf(SystemError)
                                expect(error.message).to.equal('It must contain 4 communities')
                            })
                        )

                    )
                )
            )

    })

    it('fails on retrieve an empty array of Communities', () => {
        return Community.deleteMany()
            .then(() => logic.retrieveCommunities()
                .catch((error) => {
                    expect(error).to.be.instanceOf(SystemError)
                }))
    })

    it('fails on retrieve 4 communities, one with a not correct name property', () => {
        return Community.deleteMany()
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
                .then((nova) => Community.create({
                    name: 'Jose',
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
                    .then((oblivion) => Community.create({
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
                            .then((sylvanas) => logic.retrieveCommunities()
                                .catch((error) => {
                                    expect(error).to.be.instanceOf(ContentError)
                                    expect(error.message).to.equal('Oblivion community is missing')
                                }))
                        )
                    )
                )
            )
    })

    it('fails on retrieve 4 communities, 2 with wrong names', () => {
        return Community.deleteMany()
            .then(() => Promise.all([
                Community.create({
                    name: 'Pepe',
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
                }),
                Community.create({
                    name: 'Jose',
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
                }),
                Community.create({
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
                }),
                Community.create({
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
            ]))
            .then(() => logic.retrieveCommunities()
                .catch((error) => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('Nova, Oblivion communities are missing')
                }))
    })


    after(() => mongoose.disconnect())
})