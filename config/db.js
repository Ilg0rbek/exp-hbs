const mongoose = require('mongoose');

const connectDB = async () => {
    const connection = await mongoose.connect('mongodb://localhost:27017/posters',
        { useNewUrlParser: true }
    )
    console.log(`Mongo db connected ${connection.connection.host}`);
}
module.exports = connectDB