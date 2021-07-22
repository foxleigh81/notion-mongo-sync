require('dotenv').config()
const { Client } = require("@notionhq/client")

// Initializing a new notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

module.exports = postToDb = async (data) => {
    try {
        const bookCount = NaN
        await notion.request({
            method: "POST",
            path: `pages`,
            body: {
                parent: { database_id: process.env.NOTION_DATABASE_ID },
                properties: data
            },
        })
        console.log(`Added ${bookCount} books`)
    } catch (error) {
        console.error(error)
    }
}

