const { Router } = require('express');
const { getAllSeries, createSerie, updateSerie, deleteSerie } = require('../controllers/series.controller');
const { jwtValidation } = require('../middlewares/jwt.validator');


const router = Router();

router.get('/', getAllSeries);

router.post('/',[
    jwtValidation
], createSerie);

router.put('/:id',[
    jwtValidation
], updateSerie);

router.delete('/:id',[
    jwtValidation
], deleteSerie);

module.exports = router;