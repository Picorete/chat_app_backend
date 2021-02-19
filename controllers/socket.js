const Message = require('../models/message');
const Usuario = require('../models/usuario');

const userConected = async ( uid = '' ) => {

    const usuario   = await Usuario.findById( uid );
    usuario.online  = true;
    await usuario.save();

    return usuario;
}

const userDisconnected = async ( uid = '' ) => {

    const usuario   = await Usuario.findById( uid );
    usuario.online  = false;
    await usuario.save();

    return usuario;
}

const saveMsg = async( payload ) => {
    
    try {
        const mensaje = new Message( payload );
        await mensaje.save();

        return true;
    } catch( error ) {
        return false;
    }
}

module.exports = {
    userConected,
    userDisconnected,
    saveMsg
}