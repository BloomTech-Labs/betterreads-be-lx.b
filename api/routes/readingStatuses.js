const express = require('express');
const authRequired = require('../middleware/authRequired');
const ReadingStatuses = require('../models/readingStatusesModel');
const router = express.Router();
const {
  createReadingStatusesRequirements,
  checkForSingleReadingStatus,
  checkForBooks,
} = require('../middleware/ReadingStatuses/index');
router.use(authRequired);

router.get('/', checkForBooks, (req, res) => {
  ReadingStatuses.findAll()
    .then((readingStatuses) => {
      res.status(200).json(readingStatuses);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Unable to retrieve reading statuses', err });
    });
});

router.get('/:statusId', checkForSingleReadingStatus, (req, res) => {
  const { statusId } = req.params;
  ReadingStatuses.findById(statusId)
    .then((readingStatuses) => {
      res.status(200).json(readingStatuses);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Unable to retrieve request reading status', err });
    });
});

router.post('/', createReadingStatusesRequirements, (req, res) => {
  var readingStatus = req.body;
  ReadingStatuses.create(readingStatus)
    .then((readingStatus) => {
      res.status(201).json({
        message: 'Reading status successfully added our database',
        readingStatus,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Server unable to add reading statuses', err });
    });
});

router.delete('/:statusId', checkForSingleReadingStatus, (req, res) => {
  ReadingStatuses.remove(req.params.statusId)
    .then((status) => res.status(204).json(status))
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Server failed to delete reading status', err });
    });
});

router.put('/:statusId', checkForSingleReadingStatus, (req, res) => {
  const body = req.body;
  ReadingStatuses.update(req.params.bookId, body)
    .then((status) => {
      res.status(200).json(status);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Server failed to update reading status', err });
    });
});

module.exports = router;
