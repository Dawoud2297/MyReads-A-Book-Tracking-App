import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

const MyBooks = ({booksList, selectNewShelf}) => {   

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div className="bookshelf">
                    <h2 className="bookshelf-title">currently Reading</h2>
                    <Shelf booksList={booksList} shelfName="currentlyReading" selectNewShelf={selectNewShelf}/>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <Shelf booksList={booksList} shelfName="wantToRead" selectNewShelf={selectNewShelf}/>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <Shelf booksList={booksList} shelfName="read" selectNewShelf={selectNewShelf}/>
                   
                </div>
            </div>
            <div className="open-search">
            <Link to="/search"></Link>
          </div>
        </div>
    )
}

export default MyBooks
