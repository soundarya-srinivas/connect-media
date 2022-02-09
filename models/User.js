const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { ObjectId } = mongoose.Schema.Types;
const jwt = require('jsonwebtoken')
var crypto = require('crypto');


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a username"]
        },
        email: {
            type: String,
            unique: true,
            match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
            required: [true, "Please provide a email"]
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: 6,
            select: false
        },
        followers: [{
            type: ObjectId,
            ref: "User"
        }

        ],
        profilePicture: {
            type: String,
            default: "/profile-pic-icon.jpg",
            required:false
        },
        following: [{
            type: ObjectId,
            ref: "User"
        }

        ],
       
        resetPasswordToken: String,
        resetPasswordExpire: Date




    }
    ,{
        timestamps: true
    }
)
// userSchema.pre("save", async function () {
//     if (!this.isModified("password")) {
//         next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt)
//     next();
// })
userSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getSignedToken = function(){
    return jwt.sign({ id:this._id},process.env.JWT_SECRET)
}

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() +10 *(60 * 1000);

    return resetToken
}

module.exports = mongoose.model("User", userSchema);