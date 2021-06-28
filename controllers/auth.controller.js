const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');
const { jwtGenerator } = require('../helpers/jwt.generator');

const signIn = async (req, res = response) => {
    
    const { email, password } = req.body;    
    const user = User.build({
        email,
        password
    });

    //encriptacion contraseña
    console.log(user.password);
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.status(200).json({
        user
    });
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email
            }
        });
        if(!user) {
            return res.status(400).json({
                msg: 'El email no existe'
            });
        }
        
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Passord incorrectos'
            });
        }

        
        const token = await jwtGenerator (user.uid);

        res.status(200).json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error interno'
        })
    }
}

module.exports = {
    signIn,
    login
}