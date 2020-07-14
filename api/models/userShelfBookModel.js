const findBooksByShelfId = async (shelfId) => {
    return db('userShelfBooks as usb').where("usb.shelfId",'=',shelfId).join('userBooks as ub','ub.id','=','usb.bookId').join("books as b", 'b.id','=','ub.id').join('readingStatuses as rs', 'rs.id','=','ub.readingStatusId').select([
        'usb.shelfId',
        'usb.bookId',
        'rs.name as readingStatus',
        'b.title',
        'b.thumbnail'
    ])
}

const findBookInBookshelf = async (shelfId, bookId) => {
    return db('userShelfBooks').where({shelfId,bookId}).first()
}

const insert = async (shelfId, bookId) => {
    return db('userShelfBooks').insert({shelfId,bookId}).returning("id")
}

module.exports = {findBooksByShelfId,findBookInBookshelf,insert}