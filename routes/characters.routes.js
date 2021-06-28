const { Router } = require('express');
const { 
    getAllCharacters, 
    createCharacter, 
    updateCharacter,
    deleteCharacter
} = require('../controllers/characters.controller');
const { jwtValidation } = require('../middlewares/jwt.validator');

const router = Router();

router.get('/', getAllCharacters);

router.post('/',[
    jwtValidation
], createCharacter);

router.put('/:id',[
    jwtValidation
], updateCharacter);

router.delete('/:id',[
    jwtValidation
], deleteCharacter);

module.exports = router;
