const http =require("http");
const express = require("express")
const app = express();
const routes = require('./src/routes');
require('./src/config/mongoose.config')
const cors = require("cors")

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

app.use(cors())

app.use("/assets/", express.static(process.cwd()+"/public/"));


app.use("/api/v1",routes)


app.use((error,req,res,next) => {
    let status = error && error.status ? error.status: 500;
    let msg = error && error.msg ? error.msg: "internal server error"
    console.log(error)

    res.status(status).json({
        result: null,
        status: false,
        msg: msg,
        meta: null

})

})


server.listen(3005,"localhost", (err)=>{
    if(err){
        console.log("Error listening")
    } else{
        console.log("Server is listening to 3005")
        console.log("Press ctrl+c to disconnect")
    }
})