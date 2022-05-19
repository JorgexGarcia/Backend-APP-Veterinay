const {Router} = require("express");
const {getTreatments,
    getOneTreatment,
    createTreatment,
    updateTreatment,
    getAllTreatments,
    deleteTreatment} = require('../../controllers/models/treatment');
const {checkField} = require('../../middlewares/check-field')
const {check} = require("express-validator");
const {checkJWT} = require("../../middlewares/check-JWT");

const router = Router();

router.get('/all/:active', checkJWT, getTreatments);

router.get('/pages/all', checkJWT, getAllTreatments);

router.get('/one/:id', checkJWT, getOneTreatment);

router.post('/',
    [
        checkJWT,
        check('startDate', 'Se necesita una fecha de inicio').not().isEmpty(),
        check('description', 'Se necesita una descripción').not().isEmpty(),
        check('idPet', 'Tiene que tener un animal asignado').not().isMongoId(),
        check('name', 'Tiene que tener un nombre').not().isEmpty(),
        checkField
    ],
    createTreatment
);

router.put('/:id',
    [
        checkJWT,
        check('startDate', 'Se necesita una fecha de inicio').not().isEmpty(),
        check('description', 'Se necesita una descripción').not().isEmpty(),
        check('idPet', 'Tiene que tener un animal asignado').not().isMongoId(),
        check('name', 'Tiene que tener un nombre').not().isEmpty(),
        checkField
    ],
    updateTreatment
);

router.delete('/:id', checkJWT, deleteTreatment
);

module.exports = router;
