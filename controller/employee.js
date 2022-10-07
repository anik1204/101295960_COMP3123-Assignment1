const mongoose = require("mongoose");
const Employee = require("../model/employee.js");
const Employees = mongoose.model("employeeSchema");
const express = require("express");
const router = express.Router();

/* async function getPass(cred,type="username"){
    return new Promise((res, rej) => { 
        let result = Users.findOne({ [type]: [cred] } ,function (err, docs) {
        if (err)
            throw err;
        res(docs.password);
    });
});
} */


router.post('/', async (req,res) => {
    let body = req.body;
    if("first_name" in body && "last_name" in body &&"email" in body &&"gender" in body &&"salary" in body)
    {
        const { first_name, last_name, email, gender, salary } = body;
        let ifEmailExists = await Employees.findOne({ email }).count();
        if(ifEmailExists==0){
            const employee = new Employee();
            employee.first_name = first_name;
            employee.last_name = last_name;
            employee.email = email;
            employee.gender = gender;
            employee.salary = salary;
            employee.save((err, doc) => {
                if(!err){
                    res.status(201).send({message: "Employee Added: "+first_name+" "+last_name+", Email: "+email});
                }
                else res.send("Error during insertion: "+err);
            })
        }
    else{
        res.status(200).send({message: "Email already in use."})
    }
}
else res.send("Please include all the necessary infromation { first_name, last_name, email, gender, salary }");
});


router.get('/', async (req,res) => {
    let result = Employees.find({} ,function (err, docs) {
        if (err)
            throw err;
        res.status(200).send(docs);
    });
    //res.send(result);
});

router.get('/:eid', async (req,res) => {
    let result = Employees.findOne({ "_id": [req.params.eid] } ,function (err, docs) {
        if (err)
            throw err;
        res.status(200).send(docs);});
});

router.put('/:eid', async (req,res) => {
    let result = Employees.findByIdAndUpdate([req.params.eid] ,req.body,
        function (err, docs) {
if (err){
console.log(err)
}
else{
    res.status(200).send(req.body);
}});
});

router.delete('/:eid', async (req,res) => {
    let result = Employees.findByIdAndDelete([req.params.eid] , function (err, docs) {
if (err){
console.log(err)
}
else{
    res.status(200).send("Deleted Employee: "+docs);
}});
});


module.exports = router;