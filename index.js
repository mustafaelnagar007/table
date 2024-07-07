const express=require("express");
const mysql2=require("mysql2");
const cors = require('cors')

let query=mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"fullstack"
})
let app=express()
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    
res.send('hello world')
})

app.get("/prouducts",(req,res)=>{
query.execute(`select * from products`, (error,data)=>{
    if(error){
    res.send(error)
}
else{
    res.json({message:"success", data})
}
})

})

app.get("/prouducts/:id",(req,res)=>{
    let {id}=req.params
    query.execute(`select * from products where id=${id}`, (error,data)=>{
        if(error){
        res.send(error)
    }
    else{
        res.json({message:"success", data})
    }
    })
    
    })




app.post( "/prouducts"  , (req,res)=>{
    let{name ,price , description}=req.body
query.execute(`insert into products(name,price,description) values ('${name}','${price}','${description}')`)
res.json({message:'success'})
})

app.delete("/prouducts",(req,res)=>{
let {id}= req.body
query.execute(`delete from products where id=${id}`);
  res.json({message:"success"})
})
  

app.put("/prouducts",(req,res)=>{
    let{name ,price , description, id}=req.body
    query.execute(`update products set name = '${name}', price = '${price}',description = '${description}' where id = ${id} `)
    res.json({message:"success"})
})

app.listen(3000,()=>{
    console.log("server is running in port 3000");
})