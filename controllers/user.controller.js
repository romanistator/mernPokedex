const UserModel = require("../models/user.model")
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async (req,res)=>{
    const users = await UserModel.find().select('-password')
    res.status(200).json(users)
}

module.exports.userInfo =(req,res)=>{
    console.log(req.params)
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('ID unknown:'+ req.params.id)
    }    
    UserModel.findById(req.params.id, '-password')
    .then(doc => {
      if (doc) {
        res.send(doc);
      } else {
        console.log('ID unknown');
        res.status(404).send('ID unknown');
      }
    })
    .catch(err => {
      console.error('Erreur : ' + err);
      res.status(500).send('Erreur serveur');
    });
}

module.exports.updateUser = async(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('ID unknown:'+ req.params.id)
    } 
    try {
        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { pokemon: req.body.pokemon } },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
    
        if (updatedUser) {
          return res.send(updatedUser);
        } else {
          res.status(500).json({ message: 'Erreur lors de la mise à jour' });
        }
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
}

module.exports.deleteUser = async(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('ID unknown:'+ req.params.id)
    } 
    try {
        await UserModel.deleteOne({_id:req.params.id}).exec()
        res.status(200).json({message:"Successfuly deleted."})
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
}

module.exports.addPokemon = async(req,res)=>{
  console.log(req.params.id)
  console.log("coucou")
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('ID unknown:',req.params.uid)
        
    } 
    try {
      // await UserModel.findByIdAndUpdate(
      //   req.body.userId,
      //   {$set:{...pokemon}}
      // )
       
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }

}
module.exports.deletePokemon = async(req,res)=>{
    if(!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send('ID unknown:'+ req.params.id)
    } 
    try {
       //delete to the pokemon
       
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }

}