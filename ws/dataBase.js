const mongoose = require('mongoose');
require('dotenv').config();
const URI = 

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true); 

mongoose.connect(process.env.CONN)
.then(() => console.log('DB is up'))
.catch(() => console.log(err));