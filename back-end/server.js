var express = require('express');
var cors = require('cors');
var routes = require('./routes');

let app = express();

const PORT = 4201;
app.use(express.json());
app.use(cors());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server started running at port ${PORT}`);
});
