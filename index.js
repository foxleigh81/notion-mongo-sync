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

// Checks for new books in the mongo db and then adds them to notion
function main() {
    mongo()
    .then(
        async (collection) => {
            console.log(`Scanning for new books`)
            const books = await collection.find({}).toArray()
            books.map(book => {
                const notionData = convertBook(book)
                postToDb(notionData)
            })
        }
    )
    .catch(console.error)
    .finally(() => {
        console.log(`Scan complete. Closing database connection.`)
        return client.close()
    })
}

console.log(`Service is starting`)
// Run taks once on start
main()
// Run task once per hour
setInterval(() => main(), 60 * 60 * 1000)

