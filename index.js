const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const cors      =  require("cors");
const path      =require('path');

dotenv.config();
port=process.env.PORT ||8800

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });
app.use(cors())

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

// serve static assets if in production
// if(process.env.NODE_ENV ==="production"){
//  set static folder
//    app.use(express.static('client/build'));
//   app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'client','build','index.html'));
//   });
// }

__dirname =path.resolve();
if(process.env.NODE_ENV ==='production'){
  app.use(express.static(path.join(__dirname,"client","build")));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client",'build',"index.html"));
  });
}else{
  app.get('/',(req,res)=>{
    res.send("API is running...");
  });
}

app.listen(port, () => {
  console.log(`Backend server is running! http://localhost:${port}`);
});
