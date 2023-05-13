const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const wagner = require("wagner-core");
const { Sequelize } = require("sequelize");
const session = require('express-session')
const multer = require('multer');

//routes
const adminRoute = require("./routes/admin");
const userRoutes = require('./routes/customer')

const essentials = require('./utils/middlewares/essentialsUser')

const app = express();
const sequelize = new Sequelize("ecom", "root", "", {
  host: "localhost",
  dialect: "mysql",
});



const fileStorage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null, 'images')
  },
  filename: (req,file,cb)=>{
    cb(null,new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
})
const fileFilterF = (req,file,cb)=>{
  if((file.mimetype=='image/png')||(file.mimetype=='image/jpg')||(file.mimetype=='image/jpeg')){
    // console.log('approved format');
    cb(null,true);
  }
  else{
    cb(null,false);
  }
}




//dynamic rendering engine
app.set("view engine", "ejs");
app.set("views", "views");

//middle_wares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage: fileStorage, fileFilter: fileFilterF}).single('image')) //configuring file storage options

app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true,
  cookie: {
     expires: 200 * 8000000
  }
}))
//database
require("./models")(sequelize, wagner);
require("./manager")(wagner);




app.use("/admin", adminRoute);
app.use("/",essentials,userRoutes)


const port = process.env.PORT || 8000;

sequelize
  .sync()
  .then(() => {
    console.log("Database connected..");
    app.listen(port, () => console.log("listening port: " + port));
  })
  .catch((error) => console.log("Database connection failed!: " + error));
