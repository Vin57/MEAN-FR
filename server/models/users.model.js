const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: [{ type: Schema.Types.ObjectId, ref: 'roles', required : [true, 'Ceci n\'est pas un role valide']}],
});

//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);