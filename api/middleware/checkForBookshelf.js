const Bookshelf = require('../models/bookshelfModel');

const checkForBookshelf = async (req, res, next) => {
    try {
        const id = req.params.bookshelfId
        if(!id) return res.status(401).json({error: "Enter a valid bookshelf Id"})
        const bookshelf = await Bookshelf.findById(id) 
        if(!bookshelf) return res.status(401).json({error: "Bookshelf does not exists"})
        req.bookshelf = bookshelf;
        next()
    }
    catch(err){
        return res.status(500).json({error: "Server error"})
    }
};

module.exports = checkForBookshelf;