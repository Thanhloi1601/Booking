import { promise, reject } from "bcrypt/promises";
import db from "../models/index";
import bcrypt from "bcryptjs";
import { where } from "sequelize";
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false, // if the user choose
        roleId: data.roleId,
      });
      resolve("ok create a new user succed");
    } catch (e) {
      reject(e);
    }
  });
  console.log("data form service");
  console.log(data);
  console.log(hashPasswordFromBcrypt);
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }

    // Store hash in your password DB.
  });
};
let getAllUser = () => {
  return new Promise(async (reslove, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      reslove(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById=(userId)=>{
  return new Promise( async(reslove,reject)=>{
    try {
      let user = await db.User.findOne({
        where:{id : userId}
      })
      if(user){
        reslove(user)
      }else{
        reslove([])
      }
    } catch (e) {
      reject(e)
    }
  })
}
let  updateUserData = (data)=>{
return new Promise( async(reslove,reject)=>{
  try {
    let user = await db.User.findOne({
      where:{id:data.id}
    })
    if(user){
      user.firstName = data.firstName;
      user.lastName= data.lastName
      user.address = data.address;
      await user.save();
      let allUsers = await db.User.findAll();
      reslove(allUsers)
    }else{
      reslove()
    }
    
  } catch (e) {
    
    console.log(e)
  }
})
}
let deleteUserById = (userId)=>{
  return new Promise(async(reslove,reject)=>{
    try {
      let user = await db.User.findOne({
        where:{id:userId}
      })
      if(user){
        user.destroy();
      }
      reslove()// return
    } catch (e) {
      reject(e)
    }
  })
}
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById:getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById:deleteUserById
};
