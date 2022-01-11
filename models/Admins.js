const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firebaseUid: { type: String, required: true },
});

module.exports = mongoose.model('Admin', AdminSchema);
