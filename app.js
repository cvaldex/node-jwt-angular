var express  = require("express"),
    bodyParser  = require("body-parser"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    methodOverride = require("method-override"),
    mongoose = require('mongoose'),
    cors = require('cors');
    authCtrl = require('./auth');
    middleware = require('./middleware');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride());
app.use(express.static("./app"));

var PORT = 3005;

mongoose.connect('mongodb://localhost/records', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(PORT, function() {
    console.log("Node server running on http://localhost:"+PORT);
  });
});

var RecordCtrl = require('./controllers/records');

// API routes
var records = express.Router();
app.use(records);

app.get('/records', RecordCtrl.findAllRecords);
app.get('/records/:id', RecordCtrl.findById);

//secure URL
app.post('/records', middleware.ensureAuthenticated, RecordCtrl.addRecord);
app.delete('/records/:id', middleware.ensureAuthenticated, RecordCtrl.deleteRecord);

var router = express.Router();
app.use(router);

// General routes
router.get('/', function(req, res) {
   res.sendFile("./app/index.html");
});

router.get('/auth/getToken', authCtrl.emailLogin);
