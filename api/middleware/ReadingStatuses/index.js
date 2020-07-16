const ReadingStatuses = require('../../models/readingStatusesModel');

function checkForBooks(req, res, next) {
  ReadingStatuses.findAll().then((ReadingStatuses) => {
    if (ReadingStatuses.length != 0) {
      next();
    } else {
      res.status(404).json({ erorr: 'No reading statuses were found' });
    }
  });
}

function checkForSingleReadingStatus(req, res, next) {
  const { statusId } = req.params;

  ReadingStatuses.findById(statusId).then((status) => {
    if (status) {
      next();
    } else {
      res.status(404).json({ error: 'No readingStatuse found by that ID' });
    }
  });
}

function createReadingStatusesRequirements(req, res, next) {
  const { name } = req.body;

  if (name) {
    next();
  } else {
    res.status(400).json({ error: 'MissingName' });
  }
}

module.exports = {
  createReadingStatusesRequirements,
  checkForBooks,
  checkForSingleReadingStatus,
};
