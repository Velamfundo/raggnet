const User = require('../models/schemas/user');
const bcrypt = require('bcrypt-nodejs');

function createAdmin(req, res, next) {
    if (typeof req.body.email !== 'string')
        return res.status(400).send('Missing email');
    if (typeof req.body.password !== 'string' && typeof req.body.hash !== 'string')
        return res.status(400).send('Missing password');

    if (req.body.firstName && typeof req.body.firstName === 'string')
        userData.firstName = req.body.firstName;
    if (req.body.lastName && typeof req.body.lastName === 'string')
        userData.lastName = req.body.lastName;

    // validate phone
    if (req.body.phoneNumber) {
        var phone = '';
        for (var i = 0; i < req.body.phoneNumber.length; i++) {
            if (!isNaN(req.body.phoneNumber[i]) && req.body.phoneNumber[i] !== ' ')
                phone += req.body.phoneNumber[i];
        }
        if (phone.length !== 10)
            return res.status(400).send('Invalid phone number');
        userData.phoneNumber = phone;
    }

    // validate email
    // http://emailregex.com
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)))
        return res.status(400).send('Invalid email');
    else
        userData.email = req.body.email;

    if (req.body.interests)
        userData.interests = req.body.interests;
    if (req.body.isAdmin)
        userData.isAdmin = !!req.body.isAdmin;
    if (req.body.isSuperAdmin)
        userData.isSuperAdmin = !!req.body.isSuperAdmin;
    if (req.body.password)
        userData.hash = req.body.password;
    if (req.body.hash)
        userData.hash = req.body.hash;

    // hash pw, since mongoose findOneAndUpdate bypasses hooks
    // https://github.com/Automattic/mongoose/issues/964
    userData.hash = bcrypt.hashSync(userData.hash);

    if (userData.phoneNumber)
        var userQuery = {$or: [{email: userData.email}, {phoneNumber: userData.phoneNumber}]};
    else
        var userQuery = {email: userData.email};

    User.findOneAndUpdate(userQuery, userData, {upsert:true}, (err, user) => {
        if (err) {
            if (err.code === 11000)
                return res.status(400).send('Email or phone number already registered');
            return next(err);
        }
        return res.sendStatus(200);
    });
};

module.exports = { createAdmin };
