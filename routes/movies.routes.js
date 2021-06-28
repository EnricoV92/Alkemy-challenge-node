const { Router } = require('express');
const { 
    getAllMovies, 
    createMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movies.controller');
const { jwtValidation } = require('../middlewares/jwt.validator');

const router = Router();

router.get('/', getAllMovies);

router.post('/',[
    jwtValidation
], createMovie);

router.put('/:id',[
    jwtValidation
], updateMovie);

router.delete('/:id',[
    jwtValidation
], deleteMovie);

module.exports = router;