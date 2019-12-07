const jwt = require('../jwt')
const statusCode = require('./statusCode')
const resMessage = require('./responesMessage')
const util = require('./utils')

module.exports = {
    LoggedIn: async (req, res, next) => {
        const token = req.headers.token
        if (!token) {
            res.status(409).json({
                message: "토큰 없음"
            })
        } else {
            result = jwt.verify(token);
            console.log(result)
            if (result == -1) {
                return res.status(statusCode.UNAUTHORIZED)
                    .send(util.successFalse(resMessage.EXPIRED_TOKEN));
            }
            if (result == -2) {
                return res.status(statusCode.UNAUTHORIZED)
                    .send(util.successFalse(resMessage.INVALID_TOKEN));
            }
            if (result == -3) {
                return res.status(statusCode.UNAUTHORIZED)
                    .send(util.successFalse(resMessage.EXPIRED_TOKEN));
            }
            const userEmail = result.email
            console.log(userEmail)
            if (!userEmail) {
                return res.status(statusCode.UNAUTHORIZED)
                    .send(util.successFalse(resMessage.INVALID_TOKEN));
            } else {
                req.userEmail = userEmail
                req.decoded = result
                next()
            }
        }

    }
}