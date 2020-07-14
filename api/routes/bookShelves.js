const express = require('express');
const authRequired = require('../middleware/authRequired');
const checkForUser = require('../middleware/checkForUser');
const BookShelf = require("../models/bookshelfModel");
const router = express.Router();

const createABookShelf = async (req, res) => {
    try {
        if(!req.body.name){
            return res.status(400).json({error: "Name must not be empty"})
        }
        const oldBookshelf = await BookShelf.findByName(req.body.name, req.params.userId)
        if(oldBookshelf){
            return res.status(400).json({error: "Name must be unique to the user"})
        }
        const bookshelf = {
            name: req.body.name,
            private: req.body.private || false,
            profileId: req.user.id
        }
        const newBookShelf = await BookShelf.insert(bookshelf)
        return res.status(201).json(newBookShelf)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
  }

const getAllBookShelfsOfAUser = async (req, res) => {
    try {
        const bookshelfsHash = {}
        const bookshelfs = await BookShelf.findAllBookshelfsByUserId(req.user.id);
        const bookshelfsPromises = bookshelfs.map(bookshelf => BookShelf.getAllBooksOfABookShelf(bookshelf.id))
        const booksResponse = await Promise.all(bookshelfsPromises)
        booksResponse.forEach(x => {
            if(x.length){
               bookshelfsHash[x[0].id] = x 
            }
        })
        bookshelfs.forEach(x => x.books = bookshelfsHash[x.id] || [])
        return res.status(200).json(bookshelfs)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
  }

const editBookShelf = async (req, res) => {
    try {
        const bookshelfId = req.params.bookshelfId
        const bookshelf = await BookShelf.findById(bookshelfId)
        if(!bookshelf){
            return res.status(401).json({error: "No bookshelf found with that ID"})
        }
        const {name, private} = req.body
        if(name){
            bookshelf.name = name;
        }
        if(private != null){
            bookshelf.private = private;
        }
        const edited = await BookShelf.update(bookshelf)
        return res.status(200).json(edited)
    } catch (error) {
        return res.status(500).json({error: "Server Error"})
    }
}

const deleteBookshelf = async(req, res) => {
    try {
        const bookshelfId = req.params.bookshelfId
        const bookshelf = await BookShelf.findById(bookshelfId)
        if(!bookshelf){
            return res.status(401).json({error: "No bookshelf found with that ID"})
        }
        await BookShelf.remove(bookshelf.id);
        return res.status(200).json({message: "Deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
}

router.get('/all/:userId', [checkForUser], getAllBookShelfsOfAUser);
router.post('/user/:userId', [checkForUser], createABookShelf);
router.put('/bookshelf/:bookshelfId', editBookShelf)
router.delete('/bookshelf/:bookshelfId', deleteBookshelf)

module.exports = router;