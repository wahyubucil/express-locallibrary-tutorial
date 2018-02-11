var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
    book: {type: Schema.ObjectId, ref: 'Book', required: true},
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual('url')
    .get(function() {
        return '/catalog/bookinstance/' + this._id;
    });

// Virtual for formatted due date
BookInstanceSchema.virtual('due_back_formatted')
    .get(function() {
        return moment(this.due_back).format('MMMM Do, YYYY');
    });

    // Virtual for formatted due date
BookInstanceSchema.virtual('due_back_yyyy_mm_dd')
    .get(function() {
        return moment(this.due_back).format('YYYY-MM-DD');
    });

module.exports = mongoose.model("BookInstance", BookInstanceSchema);