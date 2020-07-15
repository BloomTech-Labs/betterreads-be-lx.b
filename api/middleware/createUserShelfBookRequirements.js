const Bookshelf = require("../models/bookshelfModel")
const UserShelfBook = require("../models/userShelfBookModel");
const UserBook = require("../models/userBooksModel")

const createUserShelfBookRequirements = async (req, res, next) => {
    try {
        const { shelfId, bookId } = req.body;
        if(!shelfId) return res.status(400).json({status: "Failure", error: "shelfId field is required"})
        if(!bookId) return res.status(400).json({status: "Failure", error: "bookId field is required"})
        const bookshelf = await Bookshelf.findById(shelfId)
        const userBook = await UserBook.findById(bookId)
        const userShelfBook = await UserShelfBook.findBookInBookshelf(shelfId,bookId)
        if(!bookshelf) return res.status(400).json({status: "Failure", error: "Bookshelf with that id does not exist"})
        if(!userBook) return res.status(400).json({status: "Failure", error: "User does not have a book with that id"})
        if(userShelfBook) return res.status(400).json({status: "Failure", error: "Book already in bookshelf"})
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: "Failure", error: "Server failure"})
    }
  
  }
  
  module.exports = createUserShelfBookRequirements;