const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try{
        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario( req.body );
        
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        
        // Generar jwt
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch(e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Parece que hay un error'
        });
    }

}


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({email});

        if( !usuario ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar el password
        const validPasword = bcrypt.compareSync( password, usuario.password );
        if( !validPasword ) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch( err ){
        return res.status(500).json({
            ok: false,
            msg: 'lHable ccon el adminsitradr'
        })
    }


}

const renewToken = async ( req, res = response ) => {

    const uid = req.uid;

    const token = await generarJWT( uid );
    const usuario = await Usuario.findById(uid);

    return res.json({
        ok: true,
        usuario,
        token
    });
        
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}