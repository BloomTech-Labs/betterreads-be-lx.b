const express = require('express');
const BookShelf = require("../models/bookshelfModel");
const UserShelfBook = require("../models/userShelfBookModel");
const checkForBookshelf = require('../middleware/checkForBookshelf');
const checkForUserShelfBook = require("../middleware/checkForUserShelfBook")
const createUserShelfBookRequirements = require('../middleware/createUserShelfBookRequirements')
const router = express.Router();


router.get('/:bookshelfId/books', [checkForBookshelf], getAllBooksOfAShelf);
router.delete('/:bookshelfId/book/:bookId',[checkForUserShelfBook], deleteBookFromShelf)
router.post('/',[createUserShelfBookRequirements], addABookToABookshelf);

async function getAllBooksOfAShelf (req,res) {
    try {
        const books = await UserShelfBook.findBooksByShelfId(req.bookshelf.id)
        return res.status(200).json({status: "Successful", books})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: "Failure", error: "Server failed." })
    }
}

async function addABookToABookshelf (req,res) {
    try {
        const userShelfBook = await UserShelfBook.insert(req.body.shelfId,req.body.bookId)
        return res.status(200).json({status: "Successful", book: userShelfBook})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: "Failure", error: "Server failed." })
    }
}

async function deleteBookFromShelf (req,res) {
    try {
        const userShelfBook = await UserShelfBook.remove(req.params.bookshelfId,req.params.bookId)
        return res.status(200).json({status: "Successful", book: userShelfBook})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: "Failure", error: "Server failed." })
    }
}


module.exports = router;