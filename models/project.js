var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    name: String,
    image: String,
    url: String,
    type: String,
    tag: Array,
    description: String
});

module.exports = mongoose.model("Project", projectSchema);
