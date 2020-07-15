const Profiles = require('../models/profileModel');

const checkForUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    if (!id) return res.status(400).json({ error: 'Enter a valid Id' });
    const user = await Profiles.findById(id);
    if (!user) return res.status(400).json({ error: 'User does not exists' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = checkForUser;
