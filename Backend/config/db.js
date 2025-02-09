
const mongoose = require('mongoose');
const dotenv=require("dotenv")
dotenv.config()

main().catch(err => console.log(err));
    
    async function main() {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("DB connected")
      // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    }

module.exports = main;
