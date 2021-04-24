var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

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
let LinkModel = mongoose.model('link', linkSchema);

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
  id = id + '';
  try {
    const assetId = ObjectId(id);
    return AssetModel.findById(assetId).exec();
    // TODO: add links id's
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
};

exports.findWithPaginator = ({ pageSize, pageNumber }) => {
  return AssetModel.find()
    .limit(pageSize)
    .skip(pageSize * pageNumber)
    .exec();
};

// TODO: update for one asset to have one parent and multiple children
function saveLinks({ parent, children }, id) {
  const links = [];
  links.push(new LinkModel({ assetId: id, linkedAssetId: parent, type: 'parent' }));
  children.forEach((child) => {
    links.push(new LinkModel({ assetId: id, linkedAssetId: child, type: 'child' }));
  });

  return LinkModel.create(links);
}
