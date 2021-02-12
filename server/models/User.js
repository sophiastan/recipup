const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  favorites: [{
    ID: Number,
    title: String,
    thumbnail: String
  }]
});

mongoose.model('users', userSchema);