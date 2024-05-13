import cron from 'node-cron'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import updateWowTokenData from './updateWowTokenData.ts'

dotenv.config()

mongoose.connect(process.env.MONGODB_URL)

cron.schedule('* * * * *', () => {
    console.log('Updating WoW token data...')
    updateWowTokenData()
})