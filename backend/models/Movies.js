const { model, Schema } = require('mongoose');
// movie name, description, director, duration
const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    addedBy: String
}, { _id: true });

const Movie = model("movies", MovieSchema);

module.exports = Movie;