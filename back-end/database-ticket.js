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

var ticketSchema = new mongoose.Schema({
  description: '',
  status: '',
  user: '',
  date: '',
  assetId: '',
});
let TicketModel = mongoose.model('ticket', ticketSchema);
exports.find = (filter, pageSize = 5, pageNumber = 1) => {
  return TicketModel.find(filter)
    .skip(pageSize * pageNumber - pageSize)
    .limit(parseInt(pageSize))
    .exec();
};

exports.findFilteredCount = (filter) => {
  return TicketModel.countDocuments(filter).exec();
};

exports.create = (ticket) => {
  const newAssign = new TicketModel(ticket);
  return newAssign.save();
};

exports.update = (id, props) => {
  return TicketModel.updateOne({ _id: id }, props);
};
