const dotenv = require('dotenv')
dotenv.config();

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{
    autoCreate: true,
    autoIndex: true
}).then((conn) => {
    console.log("DB server connected")
})
.catch((except) => {
    console.log("Error establishing db connection...")
})