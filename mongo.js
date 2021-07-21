require('dotenv').config()
const { MongoClient } = require('mongodb')

const url = process.env.MONGODB_URI
const client = new MongoClient(url)

const dbName = process.env.MONGODB_DATABASE

module.exports = async function mongo() {
    await client.connect()
    console.log(`Connected to mongo server`)
    const db = client.db(dbName)
    const collection = db.collection('books')
    return collection
}

// mongo()
//     .then(
//         async (collection) => {
//             const books = await collection.find({}).toArray()
//             console.log(books)
//         }
//     )
//     .catch(console.error)
//     .finally(() => client.close())
