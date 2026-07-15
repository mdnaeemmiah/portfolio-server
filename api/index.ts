import type { Request, Response } from 'express'
import mongoose from 'mongoose'
import app from '../src/app'
import config from '../src/config'

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnectionPromise: Promise<typeof mongoose> | null | undefined
}

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose
  }

  if (!config.database_url) {
    throw new Error('DATABASE_URL is not configured in environment variables.')
  }

  if (!global.mongooseConnectionPromise) {
    global.mongooseConnectionPromise = mongoose
      .connect(config.database_url)
      .catch((error) => {
        global.mongooseConnectionPromise = null
        throw error
      })
  }

  return global.mongooseConnectionPromise
}

const handler = async (req: Request, res: Response) => {
  await connectToDatabase()
  return app(req, res)
}

export default handler
