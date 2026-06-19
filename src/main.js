const express = require('express')
const connectToDatabase = require('./config/db')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require("./routes/commentRoutes")

const app = express()

app.use(express.json());
app.use('/post', postRoutes);
app.use("/comment",commentRoutes)

async function startServer() {
  await connectToDatabase(); 
  app.listen(3000, () => {
    console.log("App iniciada");
  });
}

startServer();
