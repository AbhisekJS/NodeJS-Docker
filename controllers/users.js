const User = require('../models/users')

const getUsers = (req,res)=>{
    User.findAll()
    .then(users => {
        res.status(200).json({users})
    })
    .catch( err => console.error(err))
}

const getUser = (req,res) =>{
    const userId = req.params.userId;
    User.findByPk(userId)
    .then(user => {
        if(!user){
            return res.status(404).json({'message':'User NotFound'})
        }
        res.status(200).json({user})
    })
    .catch(err => console.log(err))
}

const addUser = (req,res) =>{
    const {name,email} = req.body;
    console.log(name,email)
    User.create({name,email})
    .then(result => {
        res.status(201).json({message:'user added',
        user: result
    })
    })
    .catch(err => console.log(err))
}

const updateUser = (req,res,next)=>{
    const {userId,updatedName,updatedEmail}=req.body
    User.findByPk(userId)
    .then(user => {
        if (!user){
            return res.status(400).json({message: 'User Not Found'})
        }
        user.name = updatedName
        user.email = updatedEmail
        return user.save()
    })
    .then(result => {
        res.status(200).json({message: 'User Updated!', user: result});
    })
    .catch(err=> console.error(err));
}

const deleteUser = (req,res)=>{
    const userId = req.params.userId
    User.findByPk(userId)
    .then(user => {
        if(!user){
            return res.status(404).json({message: 'User not found!'})
        }
    return User.destroy({
        where:{
            id: userId
        }
    })
    })
    .then(result => {
        res.status(200).json({message: 'User deleted!'})
    })
    .catch( err => console.log(err))
}

module.exports = {
getUsers,
getUser,
addUser,
updateUser,
deleteUser,
}