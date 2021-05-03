var dbUser = require('./database-user');
var dbAsset = require('./database-asset');

const LinkType = {
  CHILD: 'child',
  PARENT: 'parent',
};

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
  dbAsset.findWithPaginator(paginator).then((assets) => {
    res.send(assets);
  });
};
