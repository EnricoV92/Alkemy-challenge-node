const jwt = require('jsonwebtoken');

const jwtGenerator = (uid = '') => {
    
    return new Promise ( (resolve, reject) => {

        const payload = { uid }
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '3h'
        }, (err, token) => {

            if(err) {
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    jwtGenerator
}