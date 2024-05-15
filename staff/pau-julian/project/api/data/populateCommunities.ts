import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { Community } from './index.ts'

dotenv.config()

mongoose.connect(process.env.MONGODB_URL)
    .then(() => Community.deleteMany())
    .then(() => Community.create({
        name: 'Nova',
        dcReference: 'discord://app/channels/895261686955667466/895261691099639847',
        price: {
            m10: {
                value: 7000000,
                lastEdited: Date.now()
            },
            raidVip: {
                value: 5500000,
                lastEdited: Date.now()
            },
            raidUnsaved: {
                value: 1500000,
                lastEdited: Date.now()
            },
            raidSaved: {
                value: 150000,
                lastEdited: Date.now()
            }
        }
    }))
    .then(() => Community.create({
        name: 'Oblivion',
        dcReference: 'discord://app/channels/817565728965525534/817565729192673347',
        price: {
            m10: {
                value: 1000000,
                lastEdited: Date.now()
            },
            raidVip: {
                value: 6000000,
                lastEdited: Date.now()
            },
            raidUnsaved: {
                value: 290000,
                lastEdited: Date.now()
            },
            raidSaved: {
                value: 500000,
                lastEdited: Date.now()
            }
        }
    }))
    .then(() => Community.create({
        name: 'Dawn',
        dcReference: 'discord://app/channels/1006174254284423299/1006186471402770535',
        price: {
            m10: {
                value: 700000,
                lastEdited: Date.now()
            },
            raidVip: {
                value: 5600000,
                lastEdited: Date.now()
            },
            raidUnsaved: {
                value: 430000,
                lastEdited: Date.now()
            },
            raidSaved: {
                value: 430000,
                lastEdited: Date.now()
            }
        }
    }))
    .then(() => Community.create({
        name: 'Sylvanas',
        dcReference: 'discord://app/channels/1005035543580643381/1005081350371541092',
        price: {
            m10: {
                value: 700000,
                lastEdited: Date.now()
            },
            raidVip: {
                value: 4500000,
                lastEdited: Date.now()
            },
            raidUnsaved: {
                value: 400000,
                lastEdited: Date.now()
            },
            raidSaved: {
                value: 400000,
                lastEdited: Date.now()
            }
        }
    }))
    .then(() => mongoose.disconnect())
    .then(() => console.log('Communities populated by default!'))
    .catch(console.error)