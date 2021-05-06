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

var assignSchema = new mongoose.Schema({
  assetId: {},
  user: {},
  createDate: {},
  assignDate: {},
  returnDate: {},
  status: {},
});

let AssignModel = mongoose.model('assign', assignSchema);
// TODO: check find.. not working
exports.find = (filter, pageSize = 5, pageNumber = 1) => {
  console.log(pageSize, pageNumber);
  console.log(filter);
  return AssignModel.find(filter)
    .skip(pageSize * pageNumber - pageSize)
    .limit(parseInt(pageSize))
    .exec();
};

exports.findFilteredCount = (filter) => {
  return AssignModel.countDocuments(filter).exec();
};

exports.create = (assign) => {
  const newAssign = new AssignModel(assign);
  return newAssign.save();
};

exports.update = (id, props) => {
  return AssignModel.updateOne({ _id: id }, props);
};
