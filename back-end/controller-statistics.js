const dbTicket = require('./database-ticket');
const dbAssign = require('./database-assign');
const dbAsset = require('./database-asset');

exports.getTicket = (req, res) => {
  const { user } = req.query;

  // dbTicket.getLastUserTicker(user).then((result) => {
  //   console.log(result);
  //   res.send('lala');
  // });
  Promise.all([
    dbTicket.findFilteredCount({ user, status: '0' }),
    dbTicket.findFilteredCount({ user, status: '1' }),
    dbTicket.findFilteredCount({ user }),
  ]).then(([opened, closed, total]) => {
    res.send({ opened, closed, total });
  });
};

exports.getAssign = (req, res) => {
  const { user } = req.query;

  Promise.all([
    dbAssign.findFilteredCount({ user, status: '0' }),
    dbAssign.findFilteredCount({ user, status: '1' }),
    dbAssign.findFilteredCount({ user, status: '2' }),
  ]).then(([created, accepted, returned]) => {
    res.send({ created, accepted, returned });
  });
};

exports.getObjects = (req, res) => {
  const { user } = req.query;

  Promise.all([
    dbAssign.findFilteredCount({ user, status: '1' }),
    dbAssign.getLastAssign({ user, status: '1' }),
  ])
    .then(([count, assign]) => {
      console.log(assign);
      res.send({ count, assign });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};
