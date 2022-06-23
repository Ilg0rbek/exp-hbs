const mongoose = require('mongoose');

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI,
        { useNewUrlParser: true }
    )
    console.log(`Mongo db connected ${connection.connection.host}`);
}
module.exports = connectDB