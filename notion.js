require('dotenv').config()
const { Client } = require("@notionhq/client")

// Initializing a new notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const getDb = async () => {
    const results = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
    })
    return results.results.map(item => item.id)
}

const getPages = async (pageId) => {
    const results = await notion.pages.retrieve({
        page_id: pageId,
    })
    return results.results
}

const postToDb = async () => {
    try {
        await notion.request({
            method: "POST",
            path: `pages`,
            body: {
                parent: { database_id: process.env.NOTION_DATABASE_ID },
                properties: {
                    Title: {
                        title: [
                            {
                                "text": {
                                    "content": "Hello World"
                                }
                            }
                        ]
                    }
                }
            },
        })
        console.log("Success! Entry added.")
    } catch (error) {
        console.error(error)
    }
}

// WIP: Can't get notion to work with the API
getDb().then(
    pageIds => {
        pageIds.map(pageId => getPages(pageId).then(console.log))
    }
)

module.exports = {
    getDb,
    postToDb
}