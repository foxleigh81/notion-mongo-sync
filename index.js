require('dotenv').config()
const postToDb = require('./notion')
const convertBook = require('./convertBook')

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


// Run task once per hour
setInterval(() => {
    console.log(`Scanning for new books`)
    // Checks for new books in the mongo db and then adds them to notion
    // TODO: add a check to make sure the book is not already in notion
    mongo()
    .then(
        async (collection) => {
            const books = await collection.find({}).toArray()
            books.map(book => {
                const notionData = convertBook(book)
                postToDb(notionData)
            })
        }
    )
    .catch(console.error)
    .finally(() => client.close())

}
, 3600000)
