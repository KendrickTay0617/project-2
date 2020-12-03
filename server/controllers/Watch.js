const models = require('../models');

const { Watch } = models;

//Display makerPage (app) depending on who is signed in
const makerPage = (req, res) => {
  Watch.WatchModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), watchlist: docs });
  });
};

//Create a watchlist object
const makeWatch = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'Title is required' });
  }
    
    //object data depending on user input
  const watchData = {
    title: req.body.title,
    watchType: req.body.watchType,
    link: req.body.link,
    owner: req.session.account._id,
  };

  const newWatch = new Watch.WatchModel(watchData);

  const watchPromise = newWatch.save();

  watchPromise.then(() => res.json({ redirect: '/maker' }));

    //catch errors
  watchPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Title already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return watchPromise;
};

//get all the watchlist objects data back to the user
const getWatchlist = (request, response) => {
  const req = request;
  const res = response;

  return Watch.WatchModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ watchlist: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getWatchlist = getWatchlist;
module.exports.make = makeWatch;
