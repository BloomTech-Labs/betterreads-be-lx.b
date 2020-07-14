const getAllBooksOfABookShelf = async (shelfId) => {
    return db('userShelfBooks as usb').where("usb.shelfId",'=',shelfId).join('userBooks as ub','ub.id','=','usb.bookId').join("books as b", 'b.id','=','ub.id').join('readingStatuses as rs', 'rs.id','=','ub.readingStatusId').select([
        'usb.shelfId',
        'usb.bookId',
        'rs.name as readingStatus',
        'b.title',
        'b.thumbnail'
    ])
}

module.exports = {getAllBooksOfABookShelf}