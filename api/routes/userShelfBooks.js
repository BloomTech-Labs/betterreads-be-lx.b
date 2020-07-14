const express = require('express');
const BookShelf = require("../models/bookshelfModel");
const UserShelfBook = require("../models/userShelfBookModel");
const router = express.Router();

const getAllBooksOfAShelf = async (req,res) => {
    try {
        // CHECK IF BOOKSHELF EXISTS
        const bookshelfId = req.params.bookshelfId;
        console.log(bookshelfId)
        const books = await UserShelfBook.findBooksByShelfId(bookshelfId)
        console.log(books)
        return res.status(200).json({status: "Successful", books})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: "Failure", error: "Server failed." })
    }
}

const addABookToABookshelf = async (req,res) => {
    try {
        const {bookId,bookshelfId} = req.body;
        // CHECK IF BOOKSHELF EXISTS
        // CHECK IF USERBOOK EXISTS
        console.log(bookshelfId,bookId)
        const book = await UserShelfBook.findBookInBookshelf(bookshelfId,bookId)
        console.log(book)
        if(book){
            return res.status(400).json({status: "Failure", error: "Book already exists in bookshelf"})
        }
        const userShelfBook = await UserShelfBook.insert(bookshelfId,bookId)
        return res.status(200).json({status: "Successful", book: userShelfBook})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: "Failure", error: "Server failed." })
    }
}

const deleteBookFromShelf = async (req,res) => {
    try {
        const {bookId,bookshelfId} = req.params;
        // CHECK IF BOOKSHELF EXISTS
        // CHECK IF USERBOOK EXISTS
        console.log(bookshelfId,bookId)
        const book = await UserShelfBook.findBookInBookshelf(bookshelfId,bookId)
        console.log(book)
        if(!book){
            return res.status(400).json({status: "Failure", error: "Book is not in bookshelf"})
        }
        const userShelfBook = await UserShelfBook.remove(bookshelfId,bookId)
        return res.status(200).json({status: "Successful", book: userShelfBook})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: "Failure", error: "Server failed." })
    }
}

router.get('/:bookshelfId/books/all', getAllBooksOfAShelf);
router.post('/', addABookToABookshelf);
router.delete('/:bookshelfId/book/:bookId', deleteBookFromShelf)

module.exports = router;