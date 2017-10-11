var mongoose = require("mongoose");

var skillSchema = new mongoose.Schema({
    name: String,
    svg: String,
    type: String,
    level: String
});

module.exports = mongoose.model("Skill", skillSchema);
