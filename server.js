const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

require("./app/routers/users")(app);

const db = require("./app/models");

db.mongoose.connect(db.url, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(() => {
        console.log('Database Connected Sucessfully')
    })
    .catch((err) => {
        console.log('unable to connect with the database', err)
    })

const port = process.env.port || 4000;    

app.use(cors());
    
app.listen(port, () => {
    console.log('listening on 4000') 
})