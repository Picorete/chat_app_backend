const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async ( req, res = response ) => {

    const pag = Number( req.query.pagination ) || 0;
    const usuarios = await Usuario
        .find({_id: { $ne: req.uid }})
        .sort('-online')
        .skip(pag)
        .limit(20)

    return res.json({
        ok: true,
        usuarios
    });

}

module.exports = {
    getUsuarios
}