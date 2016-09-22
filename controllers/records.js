var mongoose = require('mongoose');
var Record = require('../models/records.js');

//GET - Return all records in the DB
exports.findAllRecords = function(req, res) {
    Record.find({} , function(err, records) {
    if(err) res.send(500, err.message);

    console.log('GET /records/');
        res.status(200).jsonp(records);
    });
};

//GET - Return a records with specified ID
exports.findById = function(req, res) {
    Record.findById(req.params.id, function(err, record) {
    if(err) return res.status(500).send( err.message);

    console.log('GET /records/' + req.params.id);
        res.status(200).jsonp(record);
    });
};

//POST - Insert a new record in the DB
exports.addRecord = function(req, res) {
    console.log('POST');
    console.log(req.body.title);

    var record = new Record({
        title:    req.body.title,
        year:     req.body.year,
        artist:  req.body.artist,
        cover:   req.body.cover,
        genre:  req.body.genre
    });

    record.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(record);
};

//DELETE - Delete a TVShow with specified ID
exports.deleteRecord = function(req, res) {
    console.log('DELETE');
    Record.findById(req.params.id, function(err, record) {
        if(record != null){
          record.remove(function(err) {
        		if(!err) {
        			console.log('Deleted!');
        		} else {
        			console.log('ERROR: ' + err);
              res.status(500).send( err.message);
        		}
        	})
        }
        res.status(200).send();
    });
};
