const mongoose = require('mongoose');

const connectDb = async (db) => {
    try {
        await mongoose.connect(db,
            { useNewUrlParser: true, useUnifiedTopology: true }, () => {
                console.log('db connected')
            });
    } catch (error) {
        console.log(error)
    }
}
module.exports = { connectDb,mongoose}
