import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { search } from '../BooksAPI'
import Book from './Book';


const Search = ({ booksList, selectNewShelf }) => {
    const [searchWords, setSearchWords] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        const debouncedResponse = debounce(async () => {
            try {
                if (searchWords) {
                    const result = await search(searchWords);
                    if (result?.error) {
                        setIsError(true)
                    } else {
                        result?.forEach(searchedBook => {
                            searchedBook.shelf = 'none';
                            for (let myBook = 0; myBook < booksList.length; myBook++) {
                                searchedBook.id === booksList[myBook].id && (searchedBook.shelf = booksList[myBook].shelf)
                            }
                        });
                        setIsError(false)
                    }
                    setSearchResult(result);
                } else if (searchWords.length === 0) {
                    const clear = () => {
                        setSearchWords('')
                        setSearchResult([])
                        setIsError(false)
                    }
                    clear();
                }
            } catch (error) {
                console.log(error)
            }
        }, 1000)
        debouncedResponse();

        return () => {
            debouncedResponse.cancel();
        }
    }, [booksList, searchWords]);


    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search"
                    to="/"
                >
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="search"
                        placeholder="Search by title, author, or ISBN"
                        autoFocus
                        value={searchWords}
                        onChange={(e) => setSearchWords(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        isError ? (
                            <h1>
                                No Results For your Search
                            </h1>
                        ) : (
                            searchResult?.length > 0 && searchResult.map(book => (
                                <Book key={book.id} book={book} selectNewShelf={selectNewShelf} />
                            ))
                        )
                    }
                </ol>
            </div>
        </div>
    )
}

export default Search
