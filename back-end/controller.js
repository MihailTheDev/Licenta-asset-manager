var database = require('./database');
exports.login = (req, res) => {
  res.send('login here');
};

exports.register = (req, res) => {
  console.log(req.body);
  const user = req.body;
  database.create(user).then((result) => {
    res.send(result);
  });
  // res.send('lolo');
};

exports.createAsset = (req, res) => {
  res.send('i create asset');
};
