// load env variables
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}
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