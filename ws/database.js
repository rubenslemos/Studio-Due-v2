const mongoose = require('mongoose')
const URI = "mongodb+srv://rubenslemos:Rumos1982@studiodue.bpjfr.mongodb.net/salao?retryWrites=true&w=majority"

mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB is on'))
    .catch((error) => console.log('err', error))