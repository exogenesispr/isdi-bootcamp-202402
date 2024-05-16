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
                value: 400000,
                lastEdited: Date.now()
            },
            raidVip: {
                value: 1500000,
                lastEdited: Date.now()
            },
            raidUnsaved: {
                value: 400000,
                lastEdited: Date.now()
            },
            raidSaved: {
                value: 250000,
                lastEdited: Date.now()
            }
        }
    }))
    .then(() => Community.create({
        name: 'Oblivion',
        dcReference: 'discord://app/channels/817565728965525534/817565729192673347',
        price: {
            m10: {
                value: 500000,
                lastEdited: Date.now()
            },
            raidVip: {
                value: 6000000,
                lastEdited: Date.now()
            },
            raidUnsaved: {
                value: 2000000,
                lastEdited: Date.now()
            },
            raidSaved: {
                value: 1500000,
                lastEdited: Date.now()
            }
        }
    }))
    .then(() => Community.create({
        name: 'Dawn',
        dcReference: 'discord://app/channels/1006174254284423299/1006186471402770535',
        price: {
            m10: {
                value: 425000,
                lastEdited: Date.now()
            },
            raidVip: {
                value: 1450000,
                lastEdited: Date.now()
            },
            raidUnsaved: {
                value: 340000,
                lastEdited: Date.now()
            },
            raidSaved: {
                value: 230000,
                lastEdited: Date.now()
            }
        }
    }))
    .then(() => Community.create({
        name: 'Sylvanas',
        dcReference: 'discord://app/channels/1005035543580643381/1005081350371541092',
        price: {
            m10: {
                value: 375000,
                lastEdited: Date.now()
            },
            raidVip: {
                value: 1400000,
                lastEdited: Date.now()
            },
            raidUnsaved: {
                value: 335000,
                lastEdited: Date.now()
            },
            raidSaved: {
                value: 225000,
                lastEdited: Date.now()
            }
        }
    }))
    .then(() => mongoose.disconnect())
    .then(() => console.log('Communities populated by default!'))
    .catch(console.error)