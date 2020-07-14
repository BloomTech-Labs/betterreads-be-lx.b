const Profiles = require('../../models/profileModel');

function checkIfProfileExists(req, res, next) {
  const { profileId } = req.body;

  Profiles.findById(profileId).then((profile) => {
    if (profile) {
      next();
    } else {
      res.status(404).json({ error: 'ProfileNotFound' });
    }
  });
}

module.exports = checkIfProfileExists;
