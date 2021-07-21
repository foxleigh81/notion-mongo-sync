require('dotenv').config()
const { getDb, postToDb } = require('notion')
const mongo = require('mongo')

// Get all books from mongo
// mongo()
//     .then(
//         async (collection) => {
//             const books = await collection.find({}).toArray()
//             console.log(books)
//         }
//     )
//     .catch(console.error)
//     .finally(() => client.close())

getDb().then(
    (response) => {
        console.log(response)
    }
)

// Get all books from notion
// Compare
// If books are different, update books in mongo
// If books are the same, do nothing
