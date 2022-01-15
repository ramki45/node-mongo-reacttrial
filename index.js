const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL = "mongodb+srv://ramki45:pandian5!@cluster0.vna1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(express.json());
app.use(cors({
    origin: "*"
}))

//post user 
let user = [];
app.post('/user_detail',async function(req,res){
    try {
        
    let connection = await mongoClient.connect(URL); 
    let db = connection.db('node-react');
    await db.collection('users').insertOne(req.body)
    await connection.close();
    res.json({message: "user added"})
    } catch (error) {
        console.log('error')    
    }
    // req.body.id = user.length + 1;
    // user.push(req.body)
    // res.json({
    //     message: 'user added'
    // })
   
})
app.get('/users',async function(req,res){
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('node-react');
        let users = await db.collection("users").find({}).toArray();
        await connection.close()
        res.json(users);
    } catch (error) {
        console.log('error')
    }
})

//GET user
 app.get('/user/:id',async function(req,res){
     try {
      
    let connection = await mongoClient.connect(URL);
    let db = connection.db('node-react');
    let objId = mongodb.ObjectId(req.params.id)
    let user = await db.collection("users").findOne({_id:objId});
    await connection.close()
    if (user) {
        res.json(user);
    } 
    else {
        res.status.json({message:"usernotfound"})
    }
   
   
     } catch (error) {
        res.status(500).json({message: "something went wrong"})
     }
//     let singleUser = user.find(obj=>obj.id == req.params.id)
//     if(singleUser){
//         res.json(singleUser)
//     }
//     else{
//         res.status(404).json({message:"user not found"})
//     }
   
  
})

//UPDATE
app.put('/users/:id',async function(req,res){
try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db('node-react');
    let objId = mongodb.ObjectId(req.params.id);
    let user =  await db.collection('users').findOneAndUpdate({_id:objId},{$set:req.body});
    res.json({message: 'user updated'})
} catch (error) {
 console.log('error')   
}
    

    // let index = user.findIndex(obj => obj.id == req.params.id)
    // Object.keys(req.body).forEach((obj)=> {
    //     user[index][obj] = req.body[obj]
        
    // })
})

//delete
app.delete('/user/:id',async function(req,res){
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db('node-react');
        let objId = mongodb.ObjectId(req.params.id)
        await db.collection("users").deleteOne({_id:objId})
        await connection.close();
        res.json({message: "user deleted"});
    } catch (error) {
        console.log('error')
    }

    // let index = user.findIndex(obj => obj.id == req.params.id);
    //  user.splice(index,1);
    //  res.json({message : "Deleted!"})
})
app.listen(process.env.PORT || 3001);
