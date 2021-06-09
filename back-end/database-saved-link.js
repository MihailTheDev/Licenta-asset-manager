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

const savedLinkSchema = new mongoose.Schema({
  assetId: {},
  assetName: {},
  user: {},
  createdAtDate: {},
});

let SavedLinkModel = mongoose.model('savedLink', savedLinkSchema);

exports.createSavedLink = (savedLink) => {
  const newSavedLink = new SavedLinkModel(savedLink);
  return newSavedLink.save();
};

exports.getSavedLinks = (user) => {
  return SavedLinkModel.find({ user: user.toString().replace('%20', ' ') }).exec();
};
