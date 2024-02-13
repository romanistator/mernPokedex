const mongoose = require("mongoose")

mongoose
    .connect('mongodb+srv://'+process.env.DB_USER_PASS+'@pokedex.vh9t0gg.mongodb.net/pokedex',

    )
    .then(()=>console.log('Connnected to MongoDB'))
    .catch((err)=>console.log('Failed to connect to MongoDB',err))