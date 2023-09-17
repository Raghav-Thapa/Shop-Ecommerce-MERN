const http = require('http');

const server = http.createServer((req,res) =>{

    let url =req.url;
    let method= req.method;
    console.log(method,url);

    if(method == "GET" && url=="/"){
        res.end("Homepage")
    }
    else if(method == "GET" && url=="/about"){
        res.end("About page")
    }else{
    res.end("not found")}
})


server.listen(3005,'localhost',(err)=>{
    if(err){
        console.log("Error listeninig to port")
    } else{
        console.log("Server is listening to port 3005")
        console.log("Press ctrl+c to disconnect server ")
    }
})