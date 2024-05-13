import mongoose, { Schema, model } from 'mongoose'

const { Types: { ObjectId } } = Schema

enum Language {
    EN = 'EN',
    ES = 'ES',
    IT = 'IT',
    DE = 'DE',
    PT = 'PT',
    RU = 'RU'
}

type PriceType = {
    value: number
    lastEdited: Date
}

const price = {
    value: {
        type: Number
    },
    lastEdited: {
        type: Date
    }
}

type UserType = {
    username: String
    password?: String
    dcName: String
    language: Language[]

    online: Boolean
    price?: {
        m10: PriceType
    }
}

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dcName: {
        type: String,
        required: true,
        unique: true,
    },
    language: {
        type: [String],
        required: true,
        enum: Object.values(Language),
    },
    online: {
        type: Boolean,
        required: true,
    },
    price: {
        m10: {
            value: {
                type: Number,
                required: true
            },
            lastEdited: {
                type: Date,
                required: true
            }
        }
    }
})

type WowTokenType = {
    last_updated_timestamp: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}

const wowToken = new Schema({
    last_updated_timestamp: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
})

type CommunityType = {
    name: String
    dcReference: String
    price: {
        m10: PriceType,
        raidVip: PriceType,
        raidUnsaved: PriceType,
        raidSaved: PriceType
    }
}

const community = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    dcReference: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        m10: {
            value: {
                type: Number,
                required: true
            },
            lastEdited: {
                type: Date,
                required: true
            }
        },
        raidVip: {
            value: {
                type: Number,
                required: true
            },
            lastEdited: {
                type: Date,
                required: true
            }
        },
        raidUnsaved: {
            value: {
                type: Number,
                required: true
            },
            lastEdited: {
                type: Date,
                required: true
            }
        },
        raidSaved: {
            value: {
                type: Number,
                required: true
            },
            lastEdited: {
                type: Date,
                required: true
            }
        }
    }
})

const User = model<UserType>('User', user)
const Community = model<CommunityType>('Community', community)
const WowToken = model<WowTokenType>('WowToken', wowToken)

export {
    Language,
    UserType,
    User,
    WowTokenType,
    WowToken,
    CommunityType,
    Community,
}