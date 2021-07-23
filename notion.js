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
    return results.results.map(item => item.properties.Title.title[0].plain_text)
}

module.exports = postToDb = (data) => {
    getDb().then(async (pageTitles) => {
        const bookTitle = data.Title.title[0].text.content
        if (!pageTitles.includes(bookTitle)) {
            await notion.request({
                method: "POST",
                path: `pages`,
                body: {
                    parent: { database_id: process.env.NOTION_DATABASE_ID },
                    properties: data
                },
            }).then(() => {
                console.log(`Added new book '${bookTitle}'`)
                return true
            }).catch(console.error)
            } 
            return false
    }).catch(console.error)        
}


 