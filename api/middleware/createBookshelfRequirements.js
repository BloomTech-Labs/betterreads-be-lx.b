const Bookshelf = require('../models/bookshelfModel');
const Profile = require('../models/profileModel');

const createBookshelfRequirements = async (req, res, next) => {
  try {
    const { name, userId } = req.body;
    console.log(req.body.userId);
    if (req.method === 'POST') {
      if (!userId)
        return res.status(400).json({
          status: 'Failure',
          error: 'User id is required to create a bookshelf',
        });
      if (!name)
        return res.status(400).json({
          status: 'Failure',
          error: 'Name is required to create bookshelf',
        });
      const user = await Profile.findById(userId);
      const bookshelf = await Bookshelf.findByName(name);
      if (!user)
        return res.status(400).json({
          status: 'Failure',
          error: 'User with that id does not exist',
        });
      if (bookshelf && bookshelf.profileId === user.id)
        return res.status(400).json({
          status: 'Failure',
          error: 'User already has a bookshelf with that name',
        });
      next();
    }
    if (req.method === 'PUT') {
      if (name) {
        const bookshelf = await Bookshelf.findByName(name);
        if (bookshelf && bookshelf.id !== req.bookshelf.id)
          return res.status(400).json({
            status: 'Failure',
            error: 'User already has a bookshelf with that name',
          });
      }
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'Failure', error: 'Server failure' });
  }
};

module.exports = createBookshelfRequirements;
