const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contentSchema = new Schema({
	heading: String,
	authorId: String,
	article: String
});


module.exports = mongoose.model('Content', contentSchema);