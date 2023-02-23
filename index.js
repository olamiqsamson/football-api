require('dotenv').config()
const express =  require("express")
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require("mongoose")
const cors = require('cors')
const notFound = require('./middleware/notFound')
mongoose.set('strictQuery', true)
const teamRouter = require('./routes/teamRouter')

app.use(cors())
app.use(express.json())

app.use(teamRouter)


app.use(notFound)

//error route





const start = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT,() =>{
            console.log(`server running on port ${PORT}...`);
        });
        } catch (error) {console.log(error);}
    }

start()