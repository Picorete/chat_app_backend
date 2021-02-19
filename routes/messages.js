/* 
    Path: /api/messages
*/

const { Router } = require('express');
const { getChat } = require('../controllers/messages');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/:to', validarJWT, getChat );

module.exports = router;