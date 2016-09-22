var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var recordSchema = new Schema({
  title:    { type: String },
  year:     { type: Number },
  artist:  { type: String },
  cover: { type: String },
  genre:    { type: String, enum:
  ['Rock', 'Pop', 'Country', 'Latin', 'World Music']
        }
});

module.exports = mongoose.model('records', recordSchema);
