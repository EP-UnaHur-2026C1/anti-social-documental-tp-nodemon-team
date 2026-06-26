const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})
const User = mongoose.model("User", userSchema);
module.exports = User;