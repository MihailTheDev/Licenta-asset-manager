var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const LinkType = {
  CHILD: 'child',
  PARENT: 'parent',
};

mongoose
  .connect(
    'mongodb+srv://eduardtibuleac:Tu89SHbpXYHNdz@cluster0.8wa4q.mongodb.net/users?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .catch((err) => {
    console.log(err);
  });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

var assetSchema = new mongoose.Schema({
  name: {},
  size: {},
  yearOfProduct: {},
  serialNumber: {},
  description: {},
  observation: {},
  group: {},
});

var linkSchema = new mongoose.Schema({
  assetId: {},
  linkedAssetId: {},
  type: {},
});

let AssetModel = mongoose.model('asset', assetSchema);
let LinkModel = mongoose.model('links', linkSchema);

exports.create = (asset) => {
  const newAsset = new AssetModel(asset);
  return new Promise((resolve, reject) => {
    newAsset
      .save()
      .then((resp) => {
        const assetId = resp.id;
        saveLinks(asset, assetId);
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.findOne = (id) => {
  try {
    const assetId = ObjectId(id.toString());
    return new Promise((resolve, reject) => {
      AssetModel.findById(assetId)
        .exec()
        .then((asset) => {
          if (!asset) {
            reject('err');
            return;
          }

          resolve(asset._doc);
        });
    });
  } catch (err) {
    return new Promise((_, reject) => {
      reject(err);
    });
  }
};

exports.getLinksByAssetId = (id) => {
  return LinkModel.find({ assetId: id.toString() }).exec();
};

exports.findWithPaginator = ({ pageSize, pageNumber }) => {
  pageSize = parseInt(pageSize);
  pageNumber = parseInt(pageNumber);
  return AssetModel.find()
    .skip(pageSize * pageNumber - pageSize)
    .exec();
};

// TODO: update for one asset to have one parent and multiple children
function saveLinks({ parent, children }, id) {
  const links = [];
  links.push(new LinkModel({ assetId: id, linkedAssetId: parent, type: LinkType.PARENT }));
  children.forEach((child) => {
    links.push(new LinkModel({ assetId: id, linkedAssetId: child, type: LinkType.CHILD }));
  });

  return LinkModel.create(links);
}
