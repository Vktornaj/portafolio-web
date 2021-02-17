module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const mongoose = require('mongoose');
    const uri = process.env.DATABASE_CONNECTION_STRING;

    const Message = require('../models/message');

    try {
        await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Database online'))
        .catch(e => console.log(e));

        const { message, email, name } = req.body;
        if (!email) {
            throw new Error('No hay correo');
        }
        const useragent = req.headers['user-agent'] || 'No se encontro user-agent';
        const xforwardedfor = req.headers['x-forwarded-for'] || 'No se encontro x-forwarded-for';
        const date = new Date();
        let ipadress = null;
        if (xforwardedfor) {
            ipadress = xforwardedfor.split(':')[0];
        }
        const messagecont = new Message( {email, name, message, date, ipadress, useragent} );

        await messagecont.save();

        context.res.status(201).json({
            ok: true,
            msg: 'Mensaje enviado'
        });
    
    } catch (error) {
        console.log(error);
        context.res.status(500).json({
            ok: false,
            msg: 'Mensaje no enviado, intente de nuevo mas tarde',
            error
        });
    }
}