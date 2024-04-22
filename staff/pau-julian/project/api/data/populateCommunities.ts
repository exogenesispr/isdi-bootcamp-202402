import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { Community } from './index.ts'

dotenv.config()

mongoose.connect(process.env.MONGODB_URL)
    .then(() => Community.deleteMany())
    .then(() => Community.create({
        name: 'Nova',
        dcReference: 'https://discordapp.com/channels/895261686955667466/895261691099639847',
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
    }))
    .then(() => Community.create({
        name: 'Oblivion',
        dcReference: 'https://discordapp.com/channels/817565728965525534/817565729192673347',
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
    }))
    .then(() => Community.create({
        name: 'Dawn',
        dcReference: 'https://discordapp.com/channels/1006174254284423299/1006186471402770535',
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
    }))
    .then(() => Community.create({
        name: 'Sylvanas',
        dcReference: 'https://discordapp.com/channels/1005035543580643381/1005081350371541092',
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
    }))
    .then(() => mongoose.disconnect())
    .then(() => console.log('Communities populated by default!'))
    .catch(console.error)