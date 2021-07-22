require('dotenv').config()
const { postToDb } = require('./notion')
const convertToNotionData = require('./convertToNotionData')

const { MongoClient } = require('mongodb')

const url = process.env.MONGODB_URI
const client = new MongoClient(url)

const dbName = process.env.MONGODB_DATABASE

async function mongo() {
    await client.connect()
    console.log(`Connected to mongo server`)
    const db = client.db(dbName)
    const collection = db.collection('books')
    return collection
}

// Get all books from mongo
mongo()
    .then(
        async (collection) => {
            const books = await collection.find({}).toArray()
            books.map(book => {
                const notionData = convertToNotionData(book)
                postToDb(notionData)
            })
        }
    )
    .catch(console.error)
    .finally(() => client.close())

