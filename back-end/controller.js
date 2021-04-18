var db = require('./db');

exports.login = (req, res) => {
  res.send('login here');
};

exports.register = (req, res) => {
  console.log(req.body);
  const user = req.body;
  res.send('register here');
};

exports.createAsset = (req, res) => {
  res.send('i create asset');
};
