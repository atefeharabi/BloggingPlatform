// require("dotenv").config();
import dotenv from 'dotenv';
dotenv.config();
const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    mongoUri: process.env.MONGODB_URI ||
    "mongodb+srv://admin:admin@cluster0.hqb8bfm.mongodb.net/" ||
    process.env.MONGO_HOST ||    
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
   (process.env.MONGO_PORT || '27017') +
    '/BloggingPlatform' 
}
export default config
// module.exports = config;
   