const mongoose = require('mongoose')


const dbconnection = ()=>{
    mongoose.connect('mongodb+srv://Krish:krish2307@cluster0.ea2vnxb.mongodb.net/Adminpanel')
    .then(()=>console.log('database is connected!!!!'))
    .catch(err=>console.log(err))
}


module.exports = dbconnection()