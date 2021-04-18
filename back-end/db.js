var mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://eduardtibuleac:<Tu89SHbpXYHNdz>@cluster0.8wa4q.mongodb.net/users?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .catch((err) => {
    console.log(err);
  });
