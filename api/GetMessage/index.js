module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const mongoose = require('mongoose');
    const uri = process.env.DATABASE_CONNECTION_STRING;

    const Message = require('../models/message');

    try {
        await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Database online'))
        .catch(e => console.log(e));

        const { message, email, name, infoBrowser } = req.body;
        if (!email) {
            throw new Error('Email no valido');
        }
        const xforwardedfor = req.headers['x-forwarded-for'];
        if (!xforwardedfor) {
            throw new Error('No se permitio establecer la coneccion, intente desde otro dispositivo.');
        }
        const date = new Date();
        let ipAddress = null;
        if (xforwardedfor) {
            ipAddress = xforwardedfor.split(':')[0];
        }

        const np_ip = Array.from(await Message.find({ 'ipAddress': `${ipAddress}` }));
        const n = np_ip.length;
        if (n >= 10) {
            const time = np_ip[n - 1].date.getTime() - np_ip[n - 10].date.getTime();
            if (time < 3600000) {
                throw new Error('Se alcanzo el limite de solicitudes intenta mas tarde.');
            }
        }

        const messagecont = new Message( {email, name, message, date, ipAddress, infoBrowser} );

        await messagecont.save();
        mongoose.connection.close()

        context.res.status(201).json({
            ok: true,
            msg: 'Mensaje enviado'
        });
    
    } catch (error) {
        console.log(error);
        context.res.status(401).json({
            ok: false,
            msg: `Mensaje no enviado, ${error}`
        });
    }
}