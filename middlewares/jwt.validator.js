const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const jwtValidation = async (req = request, res = response, next) => {

    const token = req.header('my-token');
    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    } 

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        userAuth = await User.findByPk(uid);
        if(!userAuth){
            return res.status(401).json({
                msg: 'Token no valido - user no existe en la db'
            });
        }

        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    jwtValidation
}