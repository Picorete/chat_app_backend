const { checkJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userConected, userDisconnected, saveMsg } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {
    
    const [ valid, uid ] = checkJWT( client.handshake.headers['x-token']);
    
    if( !valid ) { return client.disconnect(); }

    userConected( uid );

    // Ingresar al usuario a una sala en particular

    client.join( uid );

    // Escuchar del cliente el mensaje
    client.on('msg', async (payload) => {
        await saveMsg( payload );
        io.to( payload.to ).emit('msg', payload );
    })

    client.on('disconnect', () => {
        userDisconnected(uid);
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });


});
