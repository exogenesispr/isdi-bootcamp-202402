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
    password: String
    dcName: String
    language: Language[]

    online: Boolean
    price?: {
        type: [PriceType]
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
        type: [price]
    }
})

type CommunityType = {
    name: String
    dcReference: String
    price: {
        type: [PriceType]
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
        type: [price]
    }
})

const User = model<UserType>('User', user)
const Community = model<CommunityType>('Community', community)

export {
    Language,
    UserType,
    User,
    CommunityType,
    Community,
}