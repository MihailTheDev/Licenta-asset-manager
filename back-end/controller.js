var dbUser = require('./database-user');
var dbAsset = require('./database-asset');
var dbAssign = require('./database-assign');

const LinkType = {
  CHILD: 'child',
  PARENT: 'parent',
};

const AssignStatus = {
  CREATED: '0',
  ACCEPTED: '1',
  RETURNED: '2',
};

exports.login = (req, res) => {
  const user = ({ username, password } = req.query);
  dbUser.find(user).then((response) => {
    if (!response) {
      res.status(404).send('not found');
    } else {
      res.send({ login: 'successfully', user: response.username });
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
    .createAsset(asset)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
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
        .filter((link) => link.type === LinkType.CHILD)
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
  console.log(assign);
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

function findAssetById(assets, id) {
  return assets.reduce((acc, asset) => {
    if (asset._id === id) {
      return asset;
    }
    return acc;
  });
}
