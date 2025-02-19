
const mongoose = require('mongoose');
const dotenv=require("dotenv")
dotenv.config()

main().catch(err => console.log(err));
    
    async function main() {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("DB connected")
    }

module.exports = main;
