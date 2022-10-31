const express = require('express');
const mongoose = require('mongoose');
const PORT = 4040;
const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/ant').then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log(err);
});

//schema

const data = {
    name:String,
    age:Number
};

const monmodel = mongoose.model('user',data);

app.post('/',async(req,res)=>{
    const user = new monmodel({
        name:req.body.name,
        age:req.body.age
    });

    const valu = await user.save();
    res.send(`Hi ${valu.name}, your data save`)
});

app.get('/see',async(req,res)=>{
    const seeuser = await monmodel.find();
    res.send(seeuser);
})


app.get('/',(req,res)=>{
res.send('Hello');
});
app.listen(PORT,()=>{
    console.log('Server is Running');
});

