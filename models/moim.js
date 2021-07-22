const mongoose = require('mongooes');

var MoimSchema = mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    kind: String,
    date: {type: Date, default: Date.now},
    place: {type: String},
    need: String,
    member: {
        m1: String,
        m2: String,
        m3: String,
        m4: String,
    }
});

module.exports = mongoose.model("Moim", MoimSchema);