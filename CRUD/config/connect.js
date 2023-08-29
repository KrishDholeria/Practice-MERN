const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect(process.env.URL);
        console.log('Connected to DB');
    }catch(e){
        console.log(e);
    }
}

module.exports = connect;