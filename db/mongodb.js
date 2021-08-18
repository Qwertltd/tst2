const mongoose = require('mongoose');


//connect to mongodb
mongoose
    .connect(process.env.MONGODB_URI_ATLAS, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        retryWrites:false
    })
    .then(() => {
        console.log('mongodb connected.')
    })
    .catch((err) => console.log(err.message));

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected')
})
//Close Connection
process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})