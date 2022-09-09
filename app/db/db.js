


const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://admin:admin311@final-project.au3lb1s.mongodb.net/final-project?retryWrites=true&w=majority';

mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
    console.log('Connected to DB');
})
.catch((err) => {
    console.log(err);
});



module.exports = mongoose;

