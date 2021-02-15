module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const mongoose = require('mongoose');
    const uri = process.env.DATABASE_CONNECTION_STRING;

    const Message = require('../models/message');

    try {
        await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Database online'))
        .catch(e => console.log(e));
   
        const message = new Message( req.body );

        await message.save();

        context.res.status(201).json({
            ok: true,
            msg: 'Mensaje enviado'
        });
    
    } catch (error) {
        console.log(error);
        context.res.status(500).json({
            ok: false,
            msg: 'Mensaje no enviado, intente de nuevo mas tarde'
        });
    }

}