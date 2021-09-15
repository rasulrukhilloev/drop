import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { AdminRoute, VandorRoute } from './routes';
import { MONGO_URI } from './config/indext';

const app = express();

mongoose.connect(MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
}).then(result => {
    console.log("Connected to database")
}).catch(err => console.log("Error connecting to database: ",err))


app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/admin', AdminRoute);
app.use('/vandor', VandorRoute);



app.listen(8000, ()=>{

    console.log("App is running")
})