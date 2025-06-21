const { Schema, model } = require('mongoose');

let PostSchema = new Schema({
  post: {
    type: Buffer,
    required: true
  },
  

contentType: { 
  type: String,
 },
  

  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  section: {
    type: String,
    enum: ['automotive', 'product', 'portraits','fashion','travel'],
    required: true
  }
});

module.exports = model("post", PostSchema, "post");
