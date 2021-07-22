module.exports = function convertBook(book) {
    const notionData = {
        "Title": {
            title: [
                {
                    text: {
                        content: book.title
                    }
                }
            ]
        },
        "Author": {
            rich_text: [
                {
                    text: {
                        content: book.author
                    },
                    plain_text: book.author
                }
            ]
        },
        "Held By" : {
            select: {
                name: book.held_by
            }
        },
        "Dewey Number" : {
            rich_text: [
                {
                    text: {
                        content: book.ddc
                    },
                    plain_text: book.ddc
                }
            ]
        },
        "ISBN" : {
            rich_text: [
                {
                    text: {
                        content: book.isbn
                    },
                    plain_text: book.isbn
                }
            ]
        },
        "Category" : {
            select: {
                name: book.category
            }
        },
        "Subcategory": {
            select: {
                name: book.subcategory
            }
        },
        "URL" :{
            url: `https://www.bookfinder.com/search/?isbn=${book.isbn}&mode=isbn&st=sr&ac=qr`
        },
        "Cover": {
            "type": "files",
            "files": [
                {
                    "name": `https://pictures.abebooks.com/isbn/${book.isbn}-us-300.jpg`
                }
            ]
        }
    }
    return notionData
}