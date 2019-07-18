const User = require('../models/user')
const Helper = require('../helpers/helper')

class UserController {
    static signup(req, res, next) {
        let option = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
        User.create(option)
            .then((data) => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static signin(req, res, next) {
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    if (Helper.comparePassword(req.body.password, user.password)) {
                        let payload = {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }
                        let genToken = Helper.generateJWT(payload)
                        res.status(200).json({
                            token: genToken
                        })
                    } else {
                        next({
                            code: 404,
                            message: 'invalid username/password'
                        })
                    }
                } else {
                    next({
                        code: 404,
                        message: 'invalid username/password'
                    })
                }
            })
            .catch(next)
    }


}


module.exports = UserController