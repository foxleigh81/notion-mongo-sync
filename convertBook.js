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
        }
    }
    return notionData
}