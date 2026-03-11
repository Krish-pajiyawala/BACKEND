const mongoose = require('mongoose');

const dbconnection = () => {
    const mongoUrl = process.env.MONGODB_URL;

    if (!mongoUrl || !(mongoUrl.startsWith('mongodb://') || mongoUrl.startsWith('mongodb+srv://'))) {
        console.error('Invalid MONGODB_URL. Use a MongoDB URI starting with "mongodb://" or "mongodb+srv://".');
        process.exit(1);
    }

    mongoose.connect(mongoUrl)
        .then(() => console.log('DB is connected!!!!'))
        .catch((err) => {
            console.error('MongoDB connection failed:', err.message);
            process.exit(1);
        });
}

module.exports = dbconnection;
