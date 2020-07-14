const express = require('express');
const BookShelf = require("../models/bookshelfModel");
const UserShelfBook = require("../models/userShelfBookModel");
const router = express.Router();

const getAllBooksOfAShelf = async (req,res) => {
    try {
        // CHECK IF BOOKSHELF EXISTS
        const bookshelfId = req.params.bookshelfId;
        const books = await UserShelfBook.getAllBooksOfABookShelf(bookshelfId)
        return res.status(200).json({status: "Successful", books})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: "Failure", error: "Server failed." })
    }
}

const addABookToABookshelf = async (req,res) => {
    try {
        const {bookId,bookshelfId} = req.params
        // CHECK IF BOOKSHELF EXISTS
        // CHECK IF USERBOOK EXISTS
        const book = await UserShelfBook.findBookInBookshelf(bookshelfId,bookId)
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

router.get('/:bookshelfId/books/all', getAllBooksOfAShelf);
router.post('/:bookshelfId/book/:bookId', createABookShelf);
router.delete('/:bookshelfId/book/:bookId', deleteBookshelf)

module.exports = router;