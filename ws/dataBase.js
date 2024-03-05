const mongoose = require('mongoose');

const URI = 'mongodb+srv://5q8loHFCsxSBBkx3:5q8loHFCsxSBBkx3@cluster0.6ppaf.mongodb.net/'

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true); 

mongoose.connect(URI)
.then(() => console.log('DB is up'))
.catch(() => console.log(err));