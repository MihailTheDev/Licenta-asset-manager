var dbUser = require('./database-user');
var dbAsset = require('./database-asset');
var dbAssign = require('./database-assign');
var dbTicket = require('./database-ticket');
const LinkType = {
  CHILD: 'child',
  PARENT: 'parent',
};

const AssignStatus = {
  CREATED: '0',
  ACCEPTED: '1',
  RETURNED: '2',
};

const TicketStatus = {
  CREATED: '0',
  SOLVED: '1',
};

exports.login = (req, res) => {
  const user = ({ username, password } = req.query);
  dbUser.find(user).then((result) => {
    if (!result) {
      res.status(404).send('not found');
    } else {
      console.log(result);
      res.send({ login: 'successfully', user: result.username, role: result.role });
    }
  });
};

exports.register = (req, res) => {
  const user = req.body;
  user.role = 'user';
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
    .createAsset(asset)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

exports.updateAsset = (req, res) => {
  const id = req.params.id;
  const asset = req.body;

  dbAsset.update(asset, id).then((asset) => {
    res.send(asset);
  });
};

exports.getAsset = (req, res) => {
  const id = req.params.id;
  var asset;
  dbAsset
    .findOne(id)
    .then((minimalAsset) => {
      asset = { ...minimalAsset };
      return dbAsset.getLinksByAssetId(id);
    })
    .then((links) => {
      const { linkedAssetId: parentId } = links.reduce((acc, link) => {
        if (link.type === LinkType.PARENT) {
          return link;
        }
        return acc;
      });
      const children = links
        .filter((link) => {
          return link.type === LinkType.CHILD;
        })
        .map((link) => link.linkedAssetId);
      res.send({ ...asset, parent: parentId, children });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

exports.getLinks = (req, res) => {
  const id = req.params.assetId;
  dbAsset
    .getLinksByAssetId(id)
    .then((links) => {
      const parent = links.reduce((acc, link) => {
        if (link.type === LinkType.PARENT) {
          return link;
        }
        return acc;
      });
      const children = links.filter((link) => link.type === LinkType.CHILD);
      res.send({ parent, children });
    })
    .catch((err) => res.status(404).send('err'));
};

exports.getAssets = (req, res) => {
  const paginator = ({ pageSize, pageNumber } = req.query);

  Promise.all([dbAsset.findWithPaginator(paginator), dbAsset.getNumberOfAssets()]).then(
    (result) => {
      res.send({ assets: result[0], count: result[1] });
    },
  );
  // dbAsset.findWithPaginator(paginator).then((assets) => {
  //   res.send(assets);
  // });
};

exports.getAssigns = (req, res) => {
  const { role, user, status, pageSize, pageNumber } = req.query;
  var filter = {};
  if (role === 'user') {
    filter.user = user;
  }

  if (status) {
    filter.status = status;
  }
  Promise.all([
    dbAssign.find(filter, pageSize, pageNumber),
    dbAsset.findAll(),
    dbAssign.findFilteredCount(filter),
  ])
    .then((result) => {
      const assigns = result[0];
      const assets = result[1];
      const count = result[2];

      const assetsAssigns = [];
      assigns.forEach((assign) => {
        const asset = findAssetById(assets, assign.assetId);
        assign = assign.toObject();
        assetsAssigns.push({ name: asset.name, yearOfProduct: asset.yearOfProduct, ...assign });
      });

      res.send({ assigns: assetsAssigns, count });
    })
    .catch((err) => res.status(404).send(err));
};

exports.createAssign = (req, res) => {
  const assign = req.body;
  assign.createDate = Date.now();
  assign.status = AssignStatus.CREATED;

  dbAssign
    .create(assign)
    .then((result) => res.send(result))
    .catch((err) => res.status(400).send(err));
};

exports.updateAssign = (req, res) => {
  const id = req.params.id;
  const assignProps = req.body;
  console.log(assignProps);
  if (assignProps.status === AssignStatus.ACCEPTED) {
    assignProps.assignDate = Date.now();
  }

  if (assignProps.status === AssignStatus.RETURNED) {
    assignProps.returnDate = Date.now();
  }
  dbAssign
    .update(id, assignProps)
    .then((result) => res.send(result))
    .catch((err) => res.status(400).send(err));
};

exports.createTicket = (req, res) => {
  const ticket = req.body;
  ticket.createDate = Date.now();
  ticket.status = TicketStatus.CREATED;
  dbTicket
    .create(ticket)
    .then((result) => res.send(result))
    .catch((err) => res.status(400).send(err));
};

exports.updateTicket = (req, res) => {
  const id = req.params.id;
  const ticketProps = req.body;
  dbTicket
    .update(id, ticketProps)
    .then((result) => res.send(result))
    .catch((err) => res.status(404).send(err));
};

exports.getTickets = (req, res) => {
  const { role, user, status, pageSize, pageNumber } = req.query;
  const filter = {};

  if (role === 'user') {
    filter.user = user;
  }
  if (status) {
    filter.status = status;
  }

  Promise.all([
    dbTicket.find(filter, pageSize, pageNumber),
    dbTicket.findFilteredCount(filter),
    dbAsset.findAll(),
  ])
    .then(([tickets, allTicketsCount, assets]) => {
      const ticketedAssigns = [];
      tickets.forEach((ticket) => {
        const asset = findAssetById(assets, ticket.assetId);
        ticket = ticket.toObject();
        ticketedAssigns.push({ name: asset.name, yearOfProduct: asset.yearOfProduct, ...ticket });
      });

      res.send({ tickets: ticketedAssigns, count: allTicketsCount });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).send(JSON.stringify(err));
    });
};

function findAssetById(assets, id) {
  return assets.reduce((acc, asset) => {
    if (asset._id === id) {
      return asset;
    }
    return acc;
  });
}
