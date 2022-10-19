const express = require("express");
const cors=require('cors');
const app = express();
const {sequelize} = require('./models')


//Middleware
var corsOptions = {
  origin: '*',
}

app.use(cors(corsOptions));

app.use(express.json())       
app.use('/api/userlogin',require('./routes/usersRoute'));
app.use('/api/products',require('./routes/productsRoute'));

app.listen(5000, async (req,res) => {
  console.log("Server running at 5000");
  await sequelize.sync();
});
