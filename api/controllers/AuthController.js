const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
var opn = require('opn')
var dialog = require('dialog');

module.exports = {
 
create: function(req, res, next) {  
    userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
      if (err) 
       next(err);
      else
      dialog.info('User Added Successfully.!');
      //res.json({status: "success", message: "User added successfully!!!", data: null});
      
    });
 },
authenticate: function(req, res, next) {
    userModel.findOne({email:req.body.email}, function(err, userInfo){
    if (err) {
      next(err);
    } else {
    if(bcrypt.compareSync(req.body.password, userInfo.password)) {
    opn('http://localhost:8080/#/home');
    //const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
    //res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
    }else{
    res.json({status:"error", message: "Invalid email/password!!!", data:null});
    }
   }
        });
    
     },
     view: function(req, res, next){
        userModel.find({ name: req.body.name }, function (err, result) {
         if (err) 
          next(err);
         else
          res.json({status: "success", message: "Users found successfully!!!", data: null});
        });
    }
  }