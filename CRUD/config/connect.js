//load env variables
// if(process.env.NODE_ENV != 'production'){
//     require('dotenv').config();
// }
const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb+srv://KrishDholeria:18273645@cluster0.dzejuci.mongodb.net/?retryWrites=true&w=majority');
        console.log('Connected to DB');
    }catch(e){
        console.log(e);
    }
}

module.exports = connect;