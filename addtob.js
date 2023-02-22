require('dotenv').config()
const Teams = require('./models/team')
const jsonTeam = require('./team.json')
const mongoose = require('mongoose')



const start = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        await Teams.deleteMany();
         await Teams.create(jsonTeam)
         process.exit(0)
        
        } catch (error) {
            console.log(error);
            process.exit(1)        
        }
    }

start()