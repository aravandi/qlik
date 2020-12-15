const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Messages = new Schema ({
		text: { type: String, required: true },
		is_palindrome: {type: Boolean}
});

const db = mongoose.model('Messages', Messages)

class Message {
	constructor() {
	}

	find() {
		return db.find({})
	}

	findById(id) {
		return db.findOne({ _id: id })
	}

	save(id, update) {
		return db.update({ _id: id }, update, {})
	}

	remove(id,callback) {
		return db.deleteOne({ _id: id },callback)
	}

	insert(data) {
		return db.create(data)
	}
}

module.exports = Message;