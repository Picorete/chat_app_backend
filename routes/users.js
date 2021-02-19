/* 
    path: api/users
*/

const { Router } = require('express');
const { getUsuarios } = require('../controllers/users');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getUsuarios );

module.exports = router;

