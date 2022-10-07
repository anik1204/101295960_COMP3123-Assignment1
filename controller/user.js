const mongoose = require("mongoose");
const User = require("../model/user.js");
const Users = mongoose.model("userSchema");
const express = require("express");
const router = express.Router();

async function getPass(cred,type="username"){
    return new Promise((res, rej) => { 
        let result = Users.findOne({ [type]: [cred] } ,function (err, docs) {
        if (err)
            throw err;
        res(docs.password);
    });
});
}


router.post('/signup', async (req,res) => {
    const { username, email, password } = req.body;
    let ifUsernameExists = await Users.findOne({ username }).count();
    let ifEmailExists = await Users.findOne({ email }).count();
    if(ifUsernameExists==0 && ifEmailExists==0){
        const user = new Users();
        user.username = username;
        user.password = password;
        user.email = email;
        user.save((err, doc) => {
            if(!err){
                res.status(201).send({message: "Signed up successfully User: "+username+" Email: "+email});
            }
            else res.send("Error during insertion: "+err);
        })
    }
    else{
        res.status(200).send({message: "Username/Email already in use."})
    }
});

router.post('/login', async (req,res) => {
    let user,p;
    if("email" in req.body){
        p = await getPass(req.body.email, "email");
        user = req.body.email;
    }
    else {
        p = await getPass(req.body.username);
        user = req.body.username;
    }
    if(p==req.body.password){
                res.status(200).send({status: true,
                    user,
            message: "Logged in successfully"});
            }
            else {
                res.status(200).send({status: false,
            message: "Invalid Username/Password"});
        }
    });


module.exports = router