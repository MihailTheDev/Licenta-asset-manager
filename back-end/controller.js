var dbUser = require('./database-user');
var dbAsset = require('./database-asset');

exports.login = (req, res) => {
  const user = ({ username, password } = req.query);
  dbUser.find(user).then((response) => {
    if (!response) {
      res.status(404).send('not found');
    } else {
      res.send('successfully');
    }
  });
};

exports.register = (req, res) => {
  const user = req.body;
  dbUser
    .create(user)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.createAsset = (req, res) => {
  const asset = req.body;
  dbAsset
    .create(asset)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};