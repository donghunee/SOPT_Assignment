const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const { secretOrPrivateKey } = require('../config/secretKey');

const options = {
    algorithm: "HS256",
    expiresIn: "110230130",
    issuer: "genie"
};

module.exports = {

    sign: (email) => {
        const payload = {
            email: email,
        };
        const result = {
            token: jwt.sign(payload, secretOrPrivateKey, options),
            refreshToken: randToken.uid(256)
        };
        return result;
    },
    verify: (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretOrPrivateKey);
            console.log(decoded)
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return -3;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                return -2;
            } else {
                console.log("invalid token");
                return -2;
            }
        }
        return decoded;
    },
    refresh: (user) => {
        const payload = {
            idx: user.idx,
            grade: user.grade,
            name: user.name
        };
        return jwt.sign(payload, secretOrPrivateKey, options);
    }
}