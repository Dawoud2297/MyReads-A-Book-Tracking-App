import React from 'react'
import Book from './Book'

const Shelf = ({ booksList, shelfName, selectNewShelf}) => {
    return (
        <div>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        booksList.filter(book => (
                            book.shelf === shelfName
                        )).map(book => (
                            <li key={book.id}>
                                <Book book={book} selectNewShelf={selectNewShelf} />
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}

export default Shelf