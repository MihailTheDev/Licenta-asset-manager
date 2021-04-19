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

var userSchema = new mongoose.Schema({
  username: '',
  password: '',
  email: '',
});

let UserModel = mongoose.model('user', userSchema);

db.on('error', console.error.bind(console, 'connection error'));

exports.create = (user) => {
  const newUser = new UserModel(user);
  return newUser.save();
};

exports.find = (user) => {
  let query = UserModel.findOne(user);
  return query.exec();
};
