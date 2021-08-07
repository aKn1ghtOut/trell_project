const { model, Schema } = require('mongoose');
// timings, price, total tickets
const SlotSchema = new Schema({
    movie: new Schema({
        title: {
            type: String,
            required: true
        },
        _id: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        director: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    }, { _id: false }),
    tickets: new Schema({
        left: {
            type: Number,
            required: true
        },
        booked: {
            type: Number,
            default: 0
        }
    }),
    price: {
        type: Number,
        required: true
    },
    starttime: Number,
    addedBy: String
}, { _id: true });

const Slots = model("slots", SlotSchema);

module.exports = Slots;