
const mongoose = require('mongoose');
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')


exports.signup = (req, res, next) => {
    const { name, email, password, pic } = req.body;
    try {
        User.findOne({ email: email }).then((savedUser => {
            if (savedUser) {
                return res.status(422).json({ error: "User email already exists" })
            }
            bcrypt.hash(password, 10).then(hashedpassword => {
                const user = new User(
                    {
                        name,
                        email,
                        password: hashedpassword,
                        profilePicture: pic
                    }
                )
                user.save()
                    .then(user => {
                        res.json({ message: "saved successfully" })
                    }).catch(err => {
                        console.log(err);
                    })
            })
        }))
            .catch(err => {
                console.log(err);
            })

    } catch (error) {
        next(error)
    }
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("enterred", email)
    if (!email || !password) {
        return next(new ErrorResponse("Please provide email or password", 400))

    }
    try {
        console.log("enterred before user")
        const user = await User.findOne({ email }).select('+password')
        console.log("enterred .. user", user)
        if (!user) {
            console.log("enterred after user")
            next(new ErrorResponse("Email not found", 404))

        }
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            next(new ErrorResponse("Invalid password", 404))
        }
        console.log("enterred after ismatch")
        const token = user.getSignedToken()



        res.json({ token, User: user })

    } catch (error) {
        console.log(error)
    }
};

exports.forgotpassword = async (req, res, next) => {
    const { email } = req.body;
    console.log("email", req.body.email)
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: "User email doesn't exists ! Please Sign-Up" })
        }

        const resetToken = user.getResetPasswordToken();
        await user.save()
        var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
     
        const message = `
        <h1> You have requested a password reset </h1>
        <p>OTP for changing password is ${seq}  </p>
      
        `
        try {

            sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            })
            res.json(seq)

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save()
            return res.json({ message: "OTP has been not sent to your email! Try again later" })

        }


    } catch (error) {
        next(error)
    }
};

exports.resetpassword = async (req, res, next) => {


    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("user email not found");
        }

        bcrypt.hash(req.body.password, 10).then(hashedpassword => {
            console.log("pass", hashedpassword)
            user.password = hashedpassword
            user.resetPasswordExpire = undefined;
            user.resetPasswordToken = undefined;
            console.log("pass", user.password)

            user.save();
        })


        res.status(201).json({
            success: true,
            data: "Password Reset Successfull"
        })




    } catch (error) {
        console.log("error entered");
        next(error)
    }
};

