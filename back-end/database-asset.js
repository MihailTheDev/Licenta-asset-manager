var mongoose = require('mongoose');
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
  parents: {},
  children: {},
  group: {},
});

let AssetModel = mongoose.model('asset', assetSchema);

exports.create = (asset) => {
  const newAsset = new AssetModel(asset);
  return new Promise((resolve, reject) => {
    newAsset
      .save()
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
