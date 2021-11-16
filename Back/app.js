const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')
//api key geocoding = AIzaSyAM0SGgmHL00W1qSNE_dWY_7A2S9_xgs00
const placesRouter = require('./routes/places-routes');
const userRouter = require('./routes/users-routes');
const dummy = require('./DummyPlaces');
const myError = require('./models/myError');
const app = express();
app.use(bodyParser.json());
//app.use(placesRouter);
mongoose.connect
('mongodb+srv://ran:ran232003@cluster0.d2yn9.mongodb.net/placesApp?retryWrites=true&w=majority');
app.use(cors())
//different way without cors npm:
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
//     next();
//   });
app.use("/upload/images", express.static(__dirname + "/upload/images"));
app.use('/api/places',placesRouter);
// app.get('/', (req, res) => {
//   res.send('Successful response.');
// });
app.use('/api/users',userRouter);

app.use((req,res,next)=>{
    error = new myError("not able to find page");
    error.errorCode = 404;
    next(error);
})

app.use(function(error,req,res,next){
    //console.log(error);
    console.log("error controller",error.message);
    const  errorCode = error.code || 500
    const errorMsg = error.message || "unknown error occurd";
    res.status(errorCode)
    res.json({msg:errorMsg});

})

app.listen(5000, () => {
    console.log('Example app is listening on port 5000.')
    //console.log(dummy);
}
);