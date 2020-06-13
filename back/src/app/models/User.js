const mongoose = require('../database/index');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    cpf: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    img: {
        name: String,
        size: Number,
        key: String,
        img_path: String
    },
    role_access: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

module.exports = mongoose.model("User", UserSchema);