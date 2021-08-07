const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function(v) {
            var mat = v.match(/[a-zA-Z\- 0-9\.]+@[a-zA-Z\- 0-9\.]+\.[a-zA-Z]+/);
            console.log({ mat });
            return mat && mat[0].length === v.length ? true : false;
        }
    },
    password: {
        type: String,
        default: ""
    },
    salt: {
        type: String,
        required: true,
        default: () =>  bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS))
    }
}, { _id: true });

const User = model("users", UserSchema);

module.exports = User;