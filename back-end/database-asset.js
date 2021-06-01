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

exports.createAsset = (asset) => {
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
const getLinksByAssetId = (id) => {
  return LinkModel.find({ assetId: id.toString() }).exec();
};

exports.getLinksByAssetId = (id) => {
  return LinkModel.find({ assetId: id.toString() }).exec();
};

exports.findWithPaginator = ({ pageSize, pageNumber }) => {
  pageSize = parseInt(pageSize);
  pageNumber = parseInt(pageNumber);
  return AssetModel.find()
    .skip(pageSize * pageNumber - pageSize)
    .limit(pageSize)
    .exec();
};

exports.findAll = () => {
  return AssetModel.find().lean().exec();
};

exports.getNumberOfAssets = () => {
  return AssetModel.countDocuments({}).exec();
};

exports.update = (asset, id) => {
  return getLinksByAssetId(id)
    .then((links) => {
      return deleteLinks(links);
    })
    .then((_) => saveLinks(asset, id))
    .then((_) => AssetModel.updateOne({ _id: id }, asset).exec());
};

function deleteLinks(links) {
  const promises = [];
  links?.forEach((child) => promises.push(LinkModel.findByIdAndDelete(child).exec()));

  return Promise.all(promises);
}

function saveLinks({ parent, children }, id) {
  const links = [];
  links.push(new LinkModel({ assetId: id, linkedAssetId: parent, type: LinkType.PARENT }));
  children?.forEach((child) => {
    links.push(new LinkModel({ assetId: id, linkedAssetId: child, type: LinkType.CHILD }));
  });

  return LinkModel.create(links);
}
