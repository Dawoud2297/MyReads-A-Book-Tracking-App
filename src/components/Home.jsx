import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getAll, update } from '../BooksAPI'
import MyBooks from './MyBooks'
import Search from './Search'

const Home = () => {

    const [booksList, setBooksList] = useState([]);

    const selectNewShelf = async (book, shelf) => {
        try {
            await update(book, shelf);
            // To make sure there is not two books with the same id
            // Make sure the book is only on one shelf 
            const updateBooksList = booksList?.filter(b => book.id !== b.id)
            setBooksList([...updateBooksList, { ...book, shelf }]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            const data = await getAll();
            setBooksList(data)
        }
        )();
    }, []);

    return (
        <div>
            <Routes>
                <Route
                    path='/'
                    element={
                        <MyBooks
                            booksList={booksList}
                            selectNewShelf={selectNewShelf}
                        />
                    } />
                <Route
                    path='/search'
                    element={
                        <Search
                            booksList={booksList}
                            selectNewShelf={selectNewShelf}
                        />}
                />
            </Routes>

        </div>
    )
}

export default Home
